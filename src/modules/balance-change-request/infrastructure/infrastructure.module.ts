import { Module } from '@nestjs/common';
import { BALANCE_CHANGE_REQUEST_REPOSITORY_PORT } from '../application/ports/outbound/balance-change-request.repository.port';
import { BalanceChangeRequestRepositoryAdapter } from './persistence/typeorm/repository/balance-change-request.repository.adapter';
import { MongooseModule } from '@nestjs/mongoose';
import {
    BalanceChangeRequestEntity,
    BalanceChangeRequestSchema,
} from './persistence/typeorm/entities/balance-change-requests.entity';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import { BalanceChangeRequestMapper } from './mappers/balance-change-request.mapper';

const providers = [
    BalanceChangeRequestMapper,
    {
        provide: BALANCE_CHANGE_REQUEST_REPOSITORY_PORT,
        useClass: BalanceChangeRequestRepositoryAdapter,
    },
];

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: BalanceChangeRequestEntity.name,
                    schema: BalanceChangeRequestSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
    providers,
    exports: [...providers],
})
export class InfrastructureModule {}
