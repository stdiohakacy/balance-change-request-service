import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApproveDepositRequestDto {
    @ApiProperty({
        description: 'Request id to approve the deposit request',
        example: 'ec26fdbd-c04a-437e-b8b8-dc54b4fb2b81',
        required: true,
    })
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    requestId: string;
}
