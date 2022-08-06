import { UserRoles } from '../consts/UserRoles';

export interface UserDto {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    role: UserRoles;
    lastLogin: string;
    createdAt: string;
}
