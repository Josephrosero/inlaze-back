import { IsNotEmpty } from 'class-validator';

import { UserDetails } from '../user.details.entity';
import { RoleType } from 'modules/role/roletype.enum';

export class UserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  full_name: string;

  @IsNotEmpty()
  is_deleted: boolean;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  roles: RoleType[];

  @IsNotEmpty()
  details: UserDetails;
}