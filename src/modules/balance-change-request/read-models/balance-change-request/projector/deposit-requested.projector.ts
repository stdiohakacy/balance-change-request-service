import {
    BALANCE_CHANGE_REQUEST_READ_REPOSITORY_PORT,
    BalanceChangeRequestReadRepositoryPort,
} from '@modules/balance-change-request/application/ports/outbound/repositories/balance-change-request-read.repository.port';
import { DepositRequestedDomainEvent } from '@modules/balance-change-request/domain/events/deposit-requested.event';
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(DepositRequestedDomainEvent)
export class DepositRequestedProjector
    implements IEventHandler<DepositRequestedDomainEvent>
{
    constructor(
        @Inject(BALANCE_CHANGE_REQUEST_READ_REPOSITORY_PORT)
        private readonly readRepo: BalanceChangeRequestReadRepositoryPort
    ) {}
    /**
     * Handles the DepositRequestedDomainEvent by inserting a new deposit request
     * into the read model repository.
     *
     * @param event - The DepositRequestedDomainEvent containing details of the deposit request.
     */
    async handle(event: DepositRequestedDomainEvent): Promise<void> {
        await this.readRepo.insert({
            requestId: event.aggregateId,
            userId: event.requestedBy,
            type: 'deposit',
            status: 'pending',
            amount: event.amount.value,
            currency: event.amount.currency,
            method: event.method,
            createdAt: event.occurredAt,
        });
    }
}
