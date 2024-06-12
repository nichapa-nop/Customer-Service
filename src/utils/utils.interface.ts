import { Request } from 'express';
import { AccountEntity } from 'src/model/account/entities/account.entity';

export interface RequestWithAccount extends Request {
    reqAccount?: AccountEntity;
}
