import { Injectable, Inject } from '@nestjs/common';
import {
    EventPublisherPort,
    EVENT_PUBLISHER_PORT,
} from '../ports/outbound/event-publisher.port';
import { DepositRequestedIntegrationEvent } from '../ports/outbound/events/deposit-requested.event';

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
