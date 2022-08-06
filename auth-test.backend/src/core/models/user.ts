import { Roles } from '../consts/roles';

interface UserDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Roles;
    lastLogin: string;
    createdAt: string;
}

export { UserDto };
