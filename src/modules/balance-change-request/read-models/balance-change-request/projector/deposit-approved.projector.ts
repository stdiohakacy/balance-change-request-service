import {
    BALANCE_CHANGE_REQUEST_READ_REPOSITORY_PORT,
    BalanceChangeRequestReadRepositoryPort,
} from '@modules/balance-change-request/application/ports/outbound/balance-change-request-read.repository.port';
import { DepositApprovedDomainEvent } from '@modules/balance-change-request/domain/events/deposit-approved.event';
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(DepositApprovedDomainEvent)
export class DepositApprovedProjector
    implements IEventHandler<DepositApprovedDomainEvent>
{
    constructor(
        @Inject(BALANCE_CHANGE_REQUEST_READ_REPOSITORY_PORT)
        private readonly readRepo: BalanceChangeRequestReadRepositoryPort
    ) {}
    /**
     * Handles the DepositApprovedDomainEvent by inserting a new deposit request
     * into the read model repository.
     *
     * @param event - The DepositApprovedDomainEvent containing details of the deposit request.
     */
    async handle(event: DepositApprovedDomainEvent): Promise<void> {
        const result = await this.readRepo.findByRequestId(event.aggregateId);
        const request = result.unwrap();
        await this.readRepo.updateByRequestId(request.requestId, {
            status: 'approved',
            approvedAt: event.approvedAt,
        });
    }
}
