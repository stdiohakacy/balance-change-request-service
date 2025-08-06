import { BalanceChangeRequestReadRepositoryPort } from '@modules/balance-change-request/application/ports/outbound/repositories/balance-change-request-read.repository.port';
import { Injectable } from '@nestjs/common';
import {
    BalanceChangeRequestReadModel,
    BalanceChangeRequestReadDoc,
} from '../entities/balance-change-request-read.entity';
import { Model } from 'mongoose';
import { InjectDatabaseModel } from '@common/database/decorators/database.decorator';
import { Ok, Result } from 'oxide.ts';
import { ExceptionBase } from '@libs/exceptions';
import { Void } from '@libs/types';

@Injectable()
export class BalanceChangeRequestReadRepositoryAdapter
    implements BalanceChangeRequestReadRepositoryPort
{
    constructor(
        @InjectDatabaseModel(BalanceChangeRequestReadModel.name)
        private readonly model: Model<BalanceChangeRequestReadDoc>
    ) {}

    async insert(
        data: Partial<BalanceChangeRequestReadModel>
    ): Promise<Result<void, ExceptionBase>> {
        await this.model.create(data);
        return Ok(Void);
    }

    async updateByRequestId(
        requestId: string,
        data: Partial<BalanceChangeRequestReadModel>
    ): Promise<Result<void, ExceptionBase>> {
        await this.model.updateOne({ requestId }, { $set: data }).exec();
        return Ok(Void);
    }

    async findByUserId(
        userId: string
    ): Promise<Result<BalanceChangeRequestReadModel[], ExceptionBase>> {
        const docs = await this.model.find({ userId }).exec();
        const models = docs.map(
            doc => doc.toObject() as BalanceChangeRequestReadModel
        );
        return Ok(models);
    }

    async findByRequestId(
        requestId: string
    ): Promise<Result<BalanceChangeRequestReadDoc, ExceptionBase>> {
        const doc = await this.model.findOne({ requestId }).exec();
        if (!doc) {
            // return Err(new ExceptionBase('Not Found', 404));
        }
        return Ok(doc);
    }
}
