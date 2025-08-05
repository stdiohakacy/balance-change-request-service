import {
    EVENT_PUBLISHER_PORT,
    EventPublisherPort,
} from '@modules/balance-change-request/application/ports/outbound/event-publisher.port';
import { DepositRequestedIntegrationEvent } from '@modules/balance-change-request/application/ports/outbound/events/deposit-requested.event';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class DepositRequestedPublisher {
    constructor(
        @Inject(EVENT_PUBLISHER_PORT)
        private readonly publisher: EventPublisherPort
    ) {}

    async publish(event: DepositRequestedIntegrationEvent): Promise<void> {
        await this.publisher.publish(event, 'balance.deposit.requested');
    }
}
