import { Injectable } from '@nestjs/common';
import {
    BalanceChangeRequestDoc,
    BalanceChangeRequestEntity,
} from '../entities/balance-change-requests.entity';
import { BaseRepositoryImpl } from '@libs/infrastructure/persistence/mongoose/repository/base.repository.impl';
import { BalanceChangeRequest } from '@modules/balance-change-request/domain/aggregate/balance-change-request.aggregate';
import { BalanceChangeRequestRepositoryPort } from '@modules/balance-change-request/application/ports/outbound/balance-change-request.repository.port';
import { InjectDatabaseModel } from 'src/common/database/decorators/database.decorator';
import { Model } from 'mongoose';
import { BalanceChangeRequestMapper } from '@modules/balance-change-request/infrastructure/mappers/balance-change-request.mapper';

@Injectable()
export class BalanceChangeRequestRepositoryAdapter
    extends BaseRepositoryImpl<BalanceChangeRequest, BalanceChangeRequestDoc>
    implements BalanceChangeRequestRepositoryPort
{
    constructor(
        @InjectDatabaseModel(BalanceChangeRequestEntity.name)
        protected readonly model: Model<BalanceChangeRequestDoc>,
        protected readonly balanceChangeRequestMapper: BalanceChangeRequestMapper
    ) {
        super(model, balanceChangeRequestMapper);
    }
}
