import { Injectable } from '@nestjs/common';
import { MapperInterface } from '@libs/domain/mapper.interface';
import {
    BalanceChangeRequest,
    BalanceChangeRequestProps,
} from '@modules/balance-change-request/domain/aggregate/balance-change-request.aggregate';
import { RequestType } from '@modules/balance-change-request/domain/enums/request-type.enum';
import { PaymentMethod } from '@modules/balance-change-request/domain/enums/payment-method.enum';
import { Money } from '@modules/balance-change-request/domain/value-objects/money.vo';
import { BalanceChangeRequestDoc } from '../persistence/typeorm/entities/balance-change-requests.entity';

@Injectable()
export class BalanceChangeRequestMapper
    implements MapperInterface<BalanceChangeRequest, BalanceChangeRequestDoc>
{
    toDomain(entity: BalanceChangeRequestDoc): BalanceChangeRequest {
        return BalanceChangeRequest.create({
            userId: entity.userId,
            type: entity.type as RequestType,
            amount: new Money({
                value: Number(entity.amountValue),
                currency: entity.amountCurrency,
            }),
            method: entity.method as PaymentMethod,
            remarks: entity.remarks,
        });
    }

    toPersistence(aggregate: BalanceChangeRequest): BalanceChangeRequestDoc {
        const props: BalanceChangeRequestProps = aggregate['props'];
        return {
            id: aggregate.id.toString(),
            userId: props.userId,
            type: props.type,
            amountValue: props.amount.value,
            amountCurrency: props.amount.currency,
            method: props.method,
            remarks: props.remarks,
            status: props.status,
            createdAt: props.createdAt,
            approvedAt: props.approvedAt,
            rejectedAt: props.rejectedAt,
            processedAt: props.processedAt,
            deleted: false, // or set according to your logic
        } as BalanceChangeRequestDoc;
    }
}
