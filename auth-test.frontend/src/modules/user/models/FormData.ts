import { AuthenticationProps } from '../consts/AuthenticationProps';

export interface SignUpFormData {
    [AuthenticationProps.FirstName]: string;
    [AuthenticationProps.LastName]: string;
    [AuthenticationProps.Email]: string;
    [AuthenticationProps.Password]: string;
    [AuthenticationProps.PasswordConfirmation]: string;
}

export interface SignInFormData {
    [AuthenticationProps.Email]: string;
    [AuthenticationProps.Password]: string;
}
