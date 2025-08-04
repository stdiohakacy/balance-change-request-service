import {
    DatabaseEntity,
    DatabaseProp,
    DatabaseSchema,
} from 'src/common/database/decorators/database.decorator';
import { DatabaseEntityBase } from 'src/common/database/bases/database.entity';
import { IDatabaseDocument } from 'src/common/database/interfaces/database.interface';
import { BALANCE_CHANGE_REQUEST_SCHEMA } from '../../schema/balance-change-requests.schema';

@DatabaseEntity({ collection: BALANCE_CHANGE_REQUEST_SCHEMA.TABLE_NAME })
export class BalanceChangeRequestEntity extends DatabaseEntityBase {
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
    amountValue: number;

    @DatabaseProp({ required: true })
    amountCurrency: string;

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

export const BalanceChangeRequestSchema = DatabaseSchema(
    BalanceChangeRequestEntity
);

export type BalanceChangeRequestDoc =
    IDatabaseDocument<BalanceChangeRequestEntity>;
