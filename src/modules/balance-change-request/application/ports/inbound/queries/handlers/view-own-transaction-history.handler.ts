import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ViewOwnTransactionHistoryQuery } from '../view-own-transaction-history.query';
import { Inject } from '@nestjs/common';
import {
    BALANCE_CHANGE_REQUEST_READ_REPOSITORY_PORT,
    BalanceChangeRequestReadRepositoryPort,
} from '../../../outbound/balance-change-request-read.repository.port';
import { BalanceChangeRequestReadDoc } from '@modules/balance-change-request/read-models/balance-change-request/entities/balance-change-request-read.entity';

@QueryHandler(ViewOwnTransactionHistoryQuery)
export class ViewOwnTransactionHistoryHandler
    implements IQueryHandler<ViewOwnTransactionHistoryQuery>
{
    constructor(
        @Inject(BALANCE_CHANGE_REQUEST_READ_REPOSITORY_PORT)
        private readonly balanceChangeRequestReadRepoPort: BalanceChangeRequestReadRepositoryPort
    ) {}

    async execute(
        query: ViewOwnTransactionHistoryQuery
    ): Promise<BalanceChangeRequestReadDoc[]> {
        return this.balanceChangeRequestReadRepoPort.findByUserId(
            query.props.userId
        );
    }
}
