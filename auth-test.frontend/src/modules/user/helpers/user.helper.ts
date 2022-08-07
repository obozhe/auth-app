import { UserRoles } from '../consts/UserRoles';
import { UserDto } from '../models/User';

export const isAdmin = (user: UserDto | null): boolean => user?.role === UserRoles.Admin;

export const fullName = (user: UserDto | null): string => (user ? user.firstName + ' ' + user.lastName : '');
