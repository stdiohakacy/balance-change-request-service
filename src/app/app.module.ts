import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { AppMiddlewareModule } from 'src/app/app.middleware.module';
import { HelloModule } from '@modules/hello/hello.module';

@Module({
    controllers: [],
    providers: [],
    imports: [CommonModule, AppMiddlewareModule, HelloModule],
})
export class AppModule {}
