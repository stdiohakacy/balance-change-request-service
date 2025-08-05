import { Module } from '@nestjs/common';
import { BALANCE_CHANGE_REQUEST_REPOSITORY_PORT } from '../application/ports/outbound/balance-change-request.repository.port';
import { BalanceChangeRequestRepositoryAdapter } from './persistence/mongoose/repository/balance-change-request.repository.adapter';
import { MongooseModule } from '@nestjs/mongoose';
import {
    BalanceChangeRequestEntity,
    BalanceChangeRequestSchema,
} from './persistence/mongoose/entities/balance-change-requests.entity';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import { EVENT_PUBLISHER_PORT } from '../application/ports/outbound/event-publisher.port';
import { BalanceChangeRequestMapper } from './persistence/mappers/balance-change-request.mapper';
import { KafkaPublisherAdapter } from './messaging/kafka/publishers/kafka.publisher.adapter';
import { DepositRequestedPublisher } from './messaging/kafka/publishers/deposit-requested.publisher.service';

const providers = [
    BalanceChangeRequestMapper,
    DepositRequestedPublisher,
    {
        provide: BALANCE_CHANGE_REQUEST_REPOSITORY_PORT,
        useClass: BalanceChangeRequestRepositoryAdapter,
    },
    {
        provide: EVENT_PUBLISHER_PORT,
        useClass: KafkaPublisherAdapter,
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
