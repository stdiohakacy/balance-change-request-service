import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CreateDepositRequestHandler } from './ports/inbound/commands/handlers/create-deposit-request.handler';
import { ViewOwnTransactionHistoryHandler } from './ports/inbound/queries/handlers/view-own-transaction-history.handler';
import { DepositRequestedProjector } from '../read-models/balance-change-request/projector/deposit-requested.projector';

const queryHandlers = [ViewOwnTransactionHistoryHandler];
const commandHandlers = [CreateDepositRequestHandler];
const useCases = [];
const eventHandlers = [DepositRequestedProjector];
const sagas = [];

const providers = [
    ...queryHandlers,
    ...commandHandlers,
    ...useCases,
    ...eventHandlers,
    ...sagas,
];

@Module({
    imports: [CqrsModule, InfrastructureModule],
    providers,
    exports: [...providers],
})
export class ApplicationModule {}
