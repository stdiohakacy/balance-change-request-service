import { BaseIntegrationEvent } from '@libs/infrastructure/messaging/integration.event.base';
import {
    EVENT_PUBLISHER_PORT,
    EventPublisherPort,
} from '@modules/balance-change-request/application/ports/outbound/event-publisher.port';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class BalanceChangeRequestPublisher {
    constructor(
        @Inject(EVENT_PUBLISHER_PORT)
        private readonly publisher: EventPublisherPort
    ) {}

    async publish(event: BaseIntegrationEvent): Promise<void> {
        await this.publisher.publish(event, event.eventName);
    }
}
