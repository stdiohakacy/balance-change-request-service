import { IResponse } from '@common/response/interfaces/response.interface';
import { UniqueEntityID } from '@libs/domain/unique-entity-id';

export class BalanceChangeRequestResponseMapper {
    static toCreatedResponse(id: UniqueEntityID<string>) {
        return { data: { id: id.getValue() } as IResponse<void> };
    }
}
