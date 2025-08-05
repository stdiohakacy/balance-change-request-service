import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { ENUM_PAYMENT_METHOD } from './payment-method.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepositRequestDto {
    @ApiProperty({
        description: 'Amount to deposit',
        example: 100,
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({
        description: 'Currency of the deposit',
        example: 'USD',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    currency: string;

    @ApiProperty({
        description: 'Payment method for the deposit',
        example: ENUM_PAYMENT_METHOD.BANK_TRANSFER,
        required: true,
        enum: ENUM_PAYMENT_METHOD,
    })
    @IsString()
    @IsEnum(ENUM_PAYMENT_METHOD)
    @IsNotEmpty()
    method: ENUM_PAYMENT_METHOD;

    @ApiProperty({
        description: 'Optional remarks for the deposit request',
        example: 'Deposit for invoice #12345',
        required: false,
    })
    @IsOptional()
    @IsString()
    remarks?: string;
}
