export interface DomainToIntegrationEventMapper<
    TDomainEvent,
    TIntegrationEvent,
> {
    map(domainEvent: TDomainEvent): TIntegrationEvent;
}
