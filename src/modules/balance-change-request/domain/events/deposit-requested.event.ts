import { BaseDomainEvent, DomainEventProps } from '../../../../libs/domain';
import { PaymentMethod } from '../enums/payment-method.enum';
import { Money } from '../value-objects/money.vo';

export class DepositRequestedDomainEvent extends BaseDomainEvent {
    readonly requestedBy: string;
    readonly amount: Money;
    readonly method: PaymentMethod;

    public get eventName(): string {
        return 'DepositRequested';
    }

    constructor(props: DomainEventProps<DepositRequestedDomainEvent>) {
        super(props);
        this.requestedBy = props.requestedBy;
        this.amount = props.amount;
        this.method = props.method;
    }
}
