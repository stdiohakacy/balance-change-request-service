import { BaseDomainEvent, DomainEventProps } from '../../../../libs/domain';

export class DepositApprovedDomainEvent extends BaseDomainEvent {
    readonly approvedBy: string;
    readonly approvedAt: Date;

    public get eventName(): string {
        return 'DepositApproved';
    }

    constructor(props: DomainEventProps<DepositApprovedDomainEvent>) {
        super(props);
        this.approvedBy = props.approvedBy;
        this.approvedAt = props.approvedAt;
    }
}
