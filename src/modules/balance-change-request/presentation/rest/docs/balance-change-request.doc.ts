import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
    Doc,
    DocRequest,
    DocResponse,
} from '@common/doc/decorators/doc.decorator';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '@common/doc/enums/doc.enum';

export function DepositRequestCreateDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ summary: 'Create a deposit request' }),
        DocRequest({
            bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
        }),
        DocResponse('balanceChangeRequest.create', {
            httpStatus: HttpStatus.CREATED,
        })
    );
}

export function ViewOwnTransactionHistoryDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ summary: 'View own transaction history' }),
        DocResponse('balanceChangeRequest.viewOwnTransactionHistory', {
            httpStatus: HttpStatus.OK,
        })
    );
}

export function DepositRequestApproveDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ summary: 'Approve a deposit request' }),
        DocRequest({
            bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
        }),
        DocResponse('balanceChangeRequest.approveDepositRequest', {
            httpStatus: HttpStatus.OK,
        })
    );
}
