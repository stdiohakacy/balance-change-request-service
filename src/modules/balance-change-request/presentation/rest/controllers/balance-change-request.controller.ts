import { Controller, Post, Body, Get, Param, Query, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { match, Result } from 'oxide.ts';
import { ExceptionBase } from '@libs/exceptions';
import { CreateDepositRequestDto } from '../dtos/create-deposit-request.dto';
import {
    CreateDepositRequestCommand,
    CreateDepositRequestCommandProps,
} from '@modules/balance-change-request/application/ports/inbound/commands/create-deposit-request.command';
import { UniqueEntityID } from '@libs/domain/unique-entity-id';
import { DomainToRestErrorMapper } from '../../mappers/error-response.mapper';
import {
    DepositRequestCreateDoc,
    ViewOwnTransactionHistoryDoc,
} from '../docs/balance-change-request.doc';
import { Response } from '@common/response/decorators/response.decorator';
import { ApiTags } from '@nestjs/swagger';
import { BalanceChangeRequestResponseMapper } from '../../mappers/balance-change-request.response.mapper';
import {
    ViewOwnTransactionHistoryQuery,
    ViewOwnTransactionHistoryQueryProps,
} from '@modules/balance-change-request/application/ports/inbound/queries/view-own-transaction-history.query';
import { BalanceChangeRequestReadModel } from '@modules/balance-change-request/read-models/balance-change-request/entities/balance-change-request-read.entity';
import { ViewOwnTransactionHistoryDto } from '../dtos/view-own-transaction-history.dto';
import { ApproveDepositRequestDto } from '../dtos/approve-deposit-request.dto';
import {
    ApproveDepositRequestCommand,
    ApproveDepositRequestCommandProps,
} from '@modules/balance-change-request/application/ports/inbound/commands/approve-deposit-request.command';

@ApiTags('modules.balance-change-request')
@Controller('balance-change-requests')
export class BalanceChangeRequestController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @DepositRequestCreateDoc()
    @Response('balanceChangeRequest.createDepositRequest')
    @Post('/deposit')
    async createDepositRequest(@Body() body: CreateDepositRequestDto) {
        const commandProps = plainToInstance(
            CreateDepositRequestCommandProps,
            body
        );

        const result: Result<
            UniqueEntityID<string>,
            ExceptionBase
        > = await this.commandBus.execute(
            new CreateDepositRequestCommand(commandProps)
        );

        return match(result, {
            Ok: (id: UniqueEntityID<string>) =>
                BalanceChangeRequestResponseMapper.toCreatedResponse(id),
            Err: (error: Error) => {
                throw DomainToRestErrorMapper.map(error);
            },
        });
    }

    @Put('/deposit/:requestId/approve')
    async approveDepositRequest(@Body() body: ApproveDepositRequestDto) {
        const commandProps = plainToInstance(
            ApproveDepositRequestCommandProps,
            body
        );

        const result: Result<
            UniqueEntityID<string>,
            ExceptionBase
        > = await this.commandBus.execute(
            new ApproveDepositRequestCommand(commandProps)
        );
    }

    @ViewOwnTransactionHistoryDoc()
    @Response('balanceChangeRequest.viewOwnTransactionHistory')
    @Get('/:userId/transactions')
    async viewOwnTransactionHistory(
        @Query() query: ViewOwnTransactionHistoryDto
    ) {
        const queryProps = plainToInstance(
            ViewOwnTransactionHistoryQueryProps,
            query
        );

        const result = await this.queryBus.execute(
            new ViewOwnTransactionHistoryQuery(queryProps)
        );

        return match(result, {
            Ok: (transactions: BalanceChangeRequestReadModel[]) =>
                BalanceChangeRequestResponseMapper.toTransactionHistoryResponse(
                    transactions
                ),
            Err: (error: Error) => {
                throw DomainToRestErrorMapper.map(error);
            },
        });
    }
}
