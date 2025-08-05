import { IQuery } from '@nestjs/cqrs';

export class ViewOwnTransactionHistoryQueryProps {
    userId: string;
}

export class ViewOwnTransactionHistoryQuery implements IQuery {
    constructor(public readonly props: ViewOwnTransactionHistoryQueryProps) {}
}
