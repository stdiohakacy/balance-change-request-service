import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ViewOwnTransactionHistoryDto {
    @ApiProperty({
        description: 'User ID of the account holder',
        example: '513af0c9-79c6-4c00-a525-008a6adfda3b',
        required: true,
    })
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    userId: string;
}
