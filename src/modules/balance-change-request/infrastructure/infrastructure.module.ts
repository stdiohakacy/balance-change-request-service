import { Module } from '@nestjs/common';
import { BALANCE_CHANGE_REQUEST_REPOSITORY_PORT } from '../application/ports/outbound/balance-change-request.repository.port';
import { BalanceChangeRequestRepositoryAdapter } from './persistence/mongoose/repository/balance-change-request.repository.adapter';
import { MongooseModule } from '@nestjs/mongoose';
import {
    BalanceChangeRequestEntity,
    BalanceChangeRequestSchema,
} from './persistence/mongoose/entities/balance-change-requests.entity';
import { DATABASE_CONNECTION_NAME } from '@common/database/constants/database.constant';
import { EVENT_PUBLISHER_PORT } from '../application/ports/outbound/event-publisher.port';
import { BalanceChangeRequestMapper } from './persistence/mappers/balance-change-request.mapper';
import { KafkaPublisherAdapter } from './messaging/kafka/publishers/kafka.publisher.adapter';
import { BalanceChangeRequestPublisher } from './messaging/kafka/publishers/balance-change-request.publisher.service';
import { BALANCE_CHANGE_REQUEST_READ_REPOSITORY_PORT } from '../application/ports/outbound/balance-change-request-read.repository.port';
import { BalanceChangeRequestReadRepositoryAdapter } from '../read-models/balance-change-request/repository/balance-change-request-read.repository.adapter';
import {
    BalanceChangeRequestReadModel,
    BalanceChangeRequestReadSchema,
} from '../read-models/balance-change-request/entities/balance-change-request-read.entity';

const providers = [
    BalanceChangeRequestMapper,
    BalanceChangeRequestPublisher,
    {
        provide: BALANCE_CHANGE_REQUEST_REPOSITORY_PORT,
        useClass: BalanceChangeRequestRepositoryAdapter,
    },
    {
        provide: BALANCE_CHANGE_REQUEST_READ_REPOSITORY_PORT,
        useClass: BalanceChangeRequestReadRepositoryAdapter,
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
                {
                    name: BalanceChangeRequestReadModel.name,
                    schema: BalanceChangeRequestReadSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
    providers,
    exports: [...providers],
})
export class InfrastructureModule {}
