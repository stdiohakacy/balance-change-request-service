import { IResponse } from '@common/response/interfaces/response.interface';
import { UniqueEntityID } from '@libs/domain/unique-entity-id';
import { BalanceChangeRequestReadModel } from '@modules/balance-change-request/read-models/balance-change-request/entities/balance-change-request-read.entity';

export class BalanceChangeRequestResponseMapper {
    static toCreatedResponse(id: UniqueEntityID<string>) {
        return { data: { id: id.getValue() } as IResponse<void> };
    }

    static toTransactionHistoryResponse(
        transactions: BalanceChangeRequestReadModel[]
    ): IResponse<any[]> {
        return {
            data: transactions.map(transaction => ({
                id: transaction._id,
                type: transaction.type,
                amount: transaction.amount,
                currency: transaction.currency,
                method: transaction.method,
                remarks: transaction.remarks,
                status: transaction.status,
                createdAt: transaction.createdAt,
            })),
        };
    }
}
