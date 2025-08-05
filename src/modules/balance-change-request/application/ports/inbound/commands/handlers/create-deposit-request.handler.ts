import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { UniqueEntityID } from '@libs/domain/unique-entity-id';
import { ExceptionBase } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CreateDepositRequestCommand } from '../create-deposit-request.command';
import {
    BALANCE_CHANGE_REQUEST_REPOSITORY_PORT,
    BalanceChangeRequestRepositoryPort,
} from '../../../outbound/balance-change-request.repository.port';
import { BalanceChangeRequestMapper } from '@modules/balance-change-request/presentation/mappers/balance-change-request.mapper';
import { DepositRequestedPublisher } from '@modules/balance-change-request/application/services/deposit-requested.event-publisher.service';
import { DepositRequestedDomainEvent } from '@modules/balance-change-request/domain/events/deposit-requested.event';
import { IntegrationEventFactory } from '@modules/balance-change-request/application/services/integration-event.factory';
import { DepositRequestedIntegrationEvent } from '../../../outbound/events/deposit-requested.event';

@CommandHandler(CreateDepositRequestCommand)
export class CreateDepositRequestHandler
    implements
        ICommandHandler<
            CreateDepositRequestCommand,
            Result<UniqueEntityID<string>, ExceptionBase>
        >
{
    constructor(
        @Inject(BALANCE_CHANGE_REQUEST_REPOSITORY_PORT)
        private readonly balanceChangeRequestRepositoryPort: BalanceChangeRequestRepositoryPort,
        @Inject(DepositRequestedPublisher)
        private readonly depositRequestedPublisher: DepositRequestedPublisher
    ) {}

    async execute(
        command: CreateDepositRequestCommand
    ): Promise<Result<UniqueEntityID<string>, ExceptionBase>> {
        const { props } = command;

        const depositRequest = BalanceChangeRequestMapper.toAggregate(
            props,
            '513af0c9-79c6-4c00-a525-008a6adfda3b'
        );
        const resultOrError =
            await this.balanceChangeRequestRepositoryPort.insert(
                depositRequest
            );
        if (resultOrError.isErr()) return resultOrError;

        const domainEvent = depositRequest.domainEvents.find(
            e => e instanceof DepositRequestedDomainEvent
        ) as DepositRequestedDomainEvent;

        const event = IntegrationEventFactory.mapFrom(
            domainEvent
        ) as DepositRequestedIntegrationEvent;

        await this.depositRequestedPublisher.publish(event);

        return Ok<UniqueEntityID<string>>(depositRequest.id);
    }
}
