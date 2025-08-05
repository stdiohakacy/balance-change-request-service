import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { UniqueEntityID } from '@libs/domain/unique-entity-id';
import { ExceptionBase } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import {
    BALANCE_CHANGE_REQUEST_REPOSITORY_PORT,
    BalanceChangeRequestRepositoryPort,
} from '../../../outbound/balance-change-request.repository.port';
import { BalanceChangeRequestPublisher } from '@modules/balance-change-request/infrastructure/messaging/kafka/publishers/balance-change-request.publisher.service';
import { ApproveDepositRequestCommand } from '../approve-deposit-request.command';
import { DepositApprovedDomainEvent } from '@modules/balance-change-request/domain/events/deposit-approved.event';
import { IntegrationEventFactory } from '@modules/balance-change-request/infrastructure/messaging/integration-event.factory';
import { DepositApprovedIntegrationEvent } from '../../../outbound/events/deposit-approved.event';

@CommandHandler(ApproveDepositRequestCommand)
export class ApproveDepositRequestHandler
    implements
        ICommandHandler<
            ApproveDepositRequestCommand,
            Result<UniqueEntityID<string>, ExceptionBase>
        >
{
    constructor(
        @Inject(BALANCE_CHANGE_REQUEST_REPOSITORY_PORT)
        private readonly balanceChangeRequestRepositoryPort: BalanceChangeRequestRepositoryPort,
        @Inject(BalanceChangeRequestPublisher)
        private readonly balanceChangeRequestPublisher: BalanceChangeRequestPublisher,
        private readonly eventBus: EventBus
    ) {}
    async execute(
        command: ApproveDepositRequestCommand
    ): Promise<Result<UniqueEntityID<string>, ExceptionBase>> {
        const { props } = command;
        const balanceChangeRequest =
            await this.balanceChangeRequestRepositoryPort.findOneById(
                props.requestId
            );

        if (balanceChangeRequest.isErr()) return balanceChangeRequest;

        if (balanceChangeRequest.unwrap().isSome()) {
            // return Err(new ProductAlreadyExistsError());
        }

        const request = balanceChangeRequest.unwrap().unwrap();
        request.approve();
        const resultOrError =
            await this.balanceChangeRequestRepositoryPort.update(request);

        if (resultOrError.isErr()) return resultOrError;

        const domainEvent = request.domainEvents.find(
            e => e instanceof DepositApprovedDomainEvent
        ) as DepositApprovedDomainEvent;

        const integrationEvent = IntegrationEventFactory.mapFrom(
            domainEvent
        ) as DepositApprovedIntegrationEvent;

        await this.eventBus.publish(domainEvent);
        await this.balanceChangeRequestPublisher.publish(integrationEvent);

        return Ok<UniqueEntityID<string>>(
            new UniqueEntityID<string>(request.id.getValue())
        );
    }
}
