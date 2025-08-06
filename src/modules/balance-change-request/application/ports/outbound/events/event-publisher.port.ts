import { BaseIntegrationEvent } from '@libs/infrastructure/messaging/integration.event.base';
export const EVENT_PUBLISHER_PORT = Symbol('EVENT_PUBLISHER_PORT');

export interface EventPublisherPort {
    publish(event: BaseIntegrationEvent, topic: string): Promise<void>;
}
