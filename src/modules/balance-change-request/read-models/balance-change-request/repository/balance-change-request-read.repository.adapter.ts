import { BalanceChangeRequestReadRepositoryPort } from '@modules/balance-change-request/application/ports/outbound/balance-change-request-read.repository.port';
import { Injectable } from '@nestjs/common';
import {
    BalanceChangeRequestReadModel,
    BalanceChangeRequestReadDoc,
} from '../entities/balance-change-request-read.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectDatabaseModel } from '@common/database/decorators/database.decorator';

@Injectable()
export class BalanceChangeRequestReadRepositoryAdapter
    implements BalanceChangeRequestReadRepositoryPort
{
    constructor(
        @InjectDatabaseModel(BalanceChangeRequestReadModel.name)
        private readonly model: Model<BalanceChangeRequestReadDoc>
    ) {}

    async insert(data: Partial<BalanceChangeRequestReadModel>): Promise<void> {
        await this.model.create(data);
    }
    async findByUserId(userId: string): Promise<BalanceChangeRequestReadDoc[]> {
        return this.model.find({ userId }).exec();
    }
}
