import {
    BalanceChangeRequestReadDoc,
    BalanceChangeRequestReadModel,
} from '@modules/balance-change-request/infrastructure/persistence/mongoose/entities/balance-change-request-read.entity';

export const BALANCE_CHANGE_REQUEST_READ_REPOSITORY_PORT = Symbol(
    'BALANCE_CHANGE_REQUEST_READ_REPOSITORY_PORT'
);
export interface BalanceChangeRequestReadRepositoryPort {
    insert(data: Partial<BalanceChangeRequestReadModel>): Promise<void>;
    findByUserId(userId: string): Promise<BalanceChangeRequestReadDoc[]>;
}
