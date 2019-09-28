import { Company } from './company-details';

export class AdminUserInfo {
  id: number;
  companies: Company[];
  roles: string[];
  username: string;
}

export class AdminUserDetails {
  username: string;
}
