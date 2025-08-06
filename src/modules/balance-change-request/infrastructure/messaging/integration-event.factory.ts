import { BaseDomainEvent } from '@libs/domain';
import { BaseIntegrationEvent } from '@libs/infrastructure/messaging/integration.event.base';
import { DepositRequestedDomainEvent } from '@modules/balance-change-request/domain/events/deposit-requested.event';
import { DepositRequestedIntegrationEvent } from '../../application/ports/outbound/events/types/deposit-requested.event';
import { DepositApprovedIntegrationEvent } from '@modules/balance-change-request/application/ports/outbound/events/types/deposit-approved.event';
import { DepositApprovedDomainEvent } from '@modules/balance-change-request/domain/events/deposit-approved.event';

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

        if (domainEvent instanceof DepositApprovedDomainEvent) {
            return new DepositApprovedIntegrationEvent(
                domainEvent.aggregateId,
                domainEvent.approvedBy,
                domainEvent.approvedAt,
                domainEvent.currency,
                domainEvent.amount
            );
        }

        throw new Error('Unsupported domain event');
    }
}
