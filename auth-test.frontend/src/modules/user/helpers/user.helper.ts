import { UserRoles } from '../consts/UserRoles';
import { UserDto } from '../models/User';

export const isAdmin = (user: UserDto | null) => user?.role === UserRoles.Admin;
