import { BaseIntegrationEvent } from '@libs/infrastructure/messaging/integration.event.base';

export class DepositApprovedIntegrationEvent extends BaseIntegrationEvent {
    constructor(
        public readonly aggregateId: string,
        public readonly approvedBy: string,
        public readonly approvedAt: Date,
        public readonly currency: string,
        public readonly amount: number
    ) {
        super({
            eventName: 'DepositApproved',
            version: 1,
        });
    }
}
