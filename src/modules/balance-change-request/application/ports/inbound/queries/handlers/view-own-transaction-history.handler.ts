import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ViewOwnTransactionHistoryQuery } from '../view-own-transaction-history.query';
import { Inject } from '@nestjs/common';
import {
    BALANCE_CHANGE_REQUEST_READ_REPOSITORY_PORT,
    BalanceChangeRequestReadRepositoryPort,
} from '../../../outbound/repositories/balance-change-request-read.repository.port';
import { Result } from 'oxide.ts';
import { BalanceChangeRequestReadModel } from '@modules/balance-change-request/read-models/balance-change-request/entities/balance-change-request-read.entity';
import { ExceptionBase } from '@libs/exceptions';

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
    ): Promise<Result<BalanceChangeRequestReadModel[], ExceptionBase>> {
        return this.balanceChangeRequestReadRepoPort.findByUserId(
            query.props.userId
        );
    }
}
