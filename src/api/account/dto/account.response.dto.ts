import { ApiProperty } from '@nestjs/swagger';
import { AccountResponse, UpdateAccountResponse } from 'src/utils/utils.response.dto';

export class AccountResponseBodyDTO {
    @ApiProperty()
    accountDetail: AccountResponse;
}

export class UpdateAccountResponseBodyDTO {
    @ApiProperty()
    updateAccountDetail: UpdateAccountResponse;
}

export class GetAccountListResponseBodyDTO {
    @ApiProperty({ type: AccountResponse, isArray: true })
    accounts: AccountResponse[];
}

export class LoginUserResponseBodyDTO {
    @ApiProperty()
    accessToken: string;
}

