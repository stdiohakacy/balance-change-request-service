import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { UniqueEntityID } from '@libs/domain/unique-entity-id';
import { ExceptionBase } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import {
    BALANCE_CHANGE_REQUEST_REPOSITORY_PORT,
    BalanceChangeRequestRepositoryPort,
} from '../../../outbound/balance-change-request.repository.port';
import { BalanceChangeRequestPublisher } from '@modules/balance-change-request/infrastructure/messaging/kafka/publishers/deposit-requested.publisher.service';
import { ApproveDepositRequestCommand } from '../approve-deposit-request.command';

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
        private readonly BalanceChangeRequestPublisher: BalanceChangeRequestPublisher,
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

        return Ok<UniqueEntityID<string>>(
            new UniqueEntityID<string>(request.id.getValue())
        );
    }
}
