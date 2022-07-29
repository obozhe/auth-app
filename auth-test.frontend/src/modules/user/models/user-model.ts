import { UserRoles } from '../consts/user-roles';

export interface UserModel {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    role: UserRoles;
}
