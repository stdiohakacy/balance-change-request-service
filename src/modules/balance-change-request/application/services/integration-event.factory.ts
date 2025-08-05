import { BaseDomainEvent } from '@libs/domain';
import { BaseIntegrationEvent } from '@libs/infrastructure/messaging/integration.event.base';
import { DepositRequestedDomainEvent } from '@modules/balance-change-request/domain/events/deposit-requested.event';
import { DepositRequestedIntegrationEvent } from '../ports/outbound/events/deposit-requested.event';

export class IntegrationEventFactory {
    static mapFrom(domainEvent: BaseDomainEvent): BaseIntegrationEvent {
        if (domainEvent instanceof DepositRequestedDomainEvent) {
            return new DepositRequestedIntegrationEvent(
                domainEvent.aggregateId,
                domainEvent.requestedBy,
                domainEvent.amount.value,
                domainEvent.amount.currency,
                domainEvent.method
            );
        }

        throw new Error('Unsupported domain event');
    }
}
