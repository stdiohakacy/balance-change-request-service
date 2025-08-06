import { ExceptionBase } from '@libs/exceptions';
import {
    BalanceChangeRequestReadDoc,
    BalanceChangeRequestReadModel,
} from '@modules/balance-change-request/read-models/balance-change-request/entities/balance-change-request-read.entity';
import { Result } from 'oxide.ts';

export const BALANCE_CHANGE_REQUEST_READ_REPOSITORY_PORT = Symbol(
    'BALANCE_CHANGE_REQUEST_READ_REPOSITORY_PORT'
);
export interface BalanceChangeRequestReadRepositoryPort {
    insert(
        data: Partial<BalanceChangeRequestReadModel>
    ): Promise<Result<void, ExceptionBase>>;

    updateByRequestId(
        requestId: string,
        data: Partial<BalanceChangeRequestReadModel>
    ): Promise<Result<void, ExceptionBase>>;

    findByUserId(
        userId: string
    ): Promise<Result<BalanceChangeRequestReadModel[], ExceptionBase>>;

    findByRequestId(
        requestId: string
    ): Promise<Result<BalanceChangeRequestReadDoc, ExceptionBase>>;
}
