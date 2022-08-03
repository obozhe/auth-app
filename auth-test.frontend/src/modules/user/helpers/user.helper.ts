import { UserRoles } from '../consts/user-roles';
import { UserDto } from '../models/user';

export const isAdmin = (user: UserDto | null) => user?.role === UserRoles.Admin;
