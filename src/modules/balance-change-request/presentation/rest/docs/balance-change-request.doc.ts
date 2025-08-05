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
        // DocAuth({
        //     xApiKey: true,
        //     jwtAccessToken: true,
        // }),
        DocRequest({
            bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
            // dto: BalanceChangeRequestCreateRequestDto,
        }),
        // DocGuard({ policy: true }),
        DocResponse(
            /*BalanceChangeRequestCreateResponseDto*/ 'balanceChangeRequest.create',
            {
                httpStatus: HttpStatus.CREATED,
                // dto: BalanceChangeRequestCreateResponseDto,
            }
        )
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
