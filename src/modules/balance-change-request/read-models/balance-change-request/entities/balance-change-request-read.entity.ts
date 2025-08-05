import {
    DatabaseEntity,
    DatabaseProp,
    DatabaseSchema,
} from 'src/common/database/decorators/database.decorator';
import { DatabaseEntityBase } from 'src/common/database/bases/database.entity';
import { IDatabaseDocument } from 'src/common/database/interfaces/database.interface';
import { BALANCE_CHANGE_REQUEST_READ_SCHEMA } from '../schema/balance-change-request-read.schema';

@DatabaseEntity({ collection: BALANCE_CHANGE_REQUEST_READ_SCHEMA.TABLE_NAME })
export class BalanceChangeRequestReadModel extends DatabaseEntityBase {
    @DatabaseProp({ required: true })
    requestId: string;

    @DatabaseProp({ required: true })
    userId: string;

    @DatabaseProp({ required: true, enum: ['deposit', 'withdraw'] })
    type: 'deposit' | 'withdraw';

    @DatabaseProp({
        required: true,
        enum: ['pending', 'approved', 'rejected', 'processed'],
        default: 'pending',
    })
    status: 'pending' | 'approved' | 'rejected' | 'processed';

    @DatabaseProp({ required: true })
    amount: number;

    @DatabaseProp({ required: true })
    currency: string;

    @DatabaseProp({
        required: true,
        enum: ['credit_card', 'bank_transfer', 'e_wallet', 'qr_code'],
    })
    method: 'credit_card' | 'bank_transfer' | 'e_wallet' | 'qr_code';

    @DatabaseProp({ required: false })
    remarks?: string;

    @DatabaseProp({ required: false })
    approvedAt?: Date;

    @DatabaseProp({ required: false })
    rejectedAt?: Date;

    @DatabaseProp({ required: false })
    processedAt?: Date;
}

export const BalanceChangeRequestReadSchema = DatabaseSchema(
    BalanceChangeRequestReadModel
);

export type BalanceChangeRequestReadDoc =
    IDatabaseDocument<BalanceChangeRequestReadModel>;
