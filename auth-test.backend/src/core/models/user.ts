import { Roles } from '../consts/roles';

interface UserDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Roles;
    lastLogin: string;
    createdAt: string;
    banned?: boolean;
}

export { UserDto };
