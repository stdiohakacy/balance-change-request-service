import { BASE_SCHEMA } from '@libs/infrastructure/persistence/mongoose/schema/base.schema';

export const BALANCE_CHANGE_REQUEST_READ_SCHEMA = {
    TABLE_NAME: 'balance_change_requests_read',
    COLUMNS: {
        ...BASE_SCHEMA.FIELDS,
        REQUEST_ID: 'request_id',
        USER_ID: 'user_id',
        TYPE: 'type',
        STATUS: 'status',
        AMOUNT: 'amount',
        CURRENCY: 'currency',
        METHOD: 'method',
        REMARKS: 'remarks',
        APPROVED_AT: 'approved_at',
        REJECTED_AT: 'rejected_at',
        PROCESSED_AT: 'processed_at',
    },
    RELATED_ONE: {},
    RELATED_MANY: {},
};
