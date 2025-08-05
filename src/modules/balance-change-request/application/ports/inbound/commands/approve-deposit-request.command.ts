import { ICommand } from '@nestjs/cqrs';

export class ApproveDepositRequestCommandProps {
    requestId: string;
}

export class ApproveDepositRequestCommand implements ICommand {
    constructor(public readonly props: ApproveDepositRequestCommandProps) {}
}
