import { BaseIntegrationEvent } from '@libs/infrastructure/messaging/integration.event.base';

export class DepositApprovedIntegrationEvent extends BaseIntegrationEvent {
    constructor(
        public readonly aggregateId: string,
        public readonly approvedBy: string,
        public readonly approvedAt: Date
    ) {
        super({
            eventName: 'DepositApproved',
            version: 1,
        });
    }
}
