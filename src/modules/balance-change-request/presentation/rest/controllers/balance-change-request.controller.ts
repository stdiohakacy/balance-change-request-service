import { Controller, Post, Body, Get, Param } from '@nestjs/common';
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
import { DepositRequestCreateDoc } from '../docs/balance-change-request.doc';
import { Response } from '@common/response/decorators/response.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('modules.balance-change-request')
@Controller('balance-change-requests')
export class BalanceChangeRequestController {
    constructor(private readonly commandBus: CommandBus) {}

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
            Ok: (id: UniqueEntityID<string>) => {
                return id;
            },
            Err: (error: Error) => {
                throw DomainToRestErrorMapper.map(error);
            },
        });
    }
}
