import { BaseDto } from './baseentity.model';

export class Account extends BaseDto {

  name: string;
  accountCode: string;
  description?: string;
  type?: string;
  project?: any;
  parent?: Account;
  children?: Account[];

}

