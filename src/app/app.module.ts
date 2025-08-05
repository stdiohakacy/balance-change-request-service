import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { AppMiddlewareModule } from '@app/app.middleware.module';
import { HelloModule } from '@modules/hello/hello.module';
import { BalanceChangeRequestModule } from '@modules/balance-change-request/balance-change-request.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        CommonModule,
        AppMiddlewareModule,
        HelloModule,
        BalanceChangeRequestModule,
    ],
})
export class AppModule {}
