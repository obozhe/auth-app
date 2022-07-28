import { AuthenticationProps } from '../consts/authentication-props';

export interface RegistrationFormData {
    [AuthenticationProps.FirstName]: string;
    [AuthenticationProps.LastName]: string;
    [AuthenticationProps.Email]: string;
    [AuthenticationProps.Password]: string;
    [AuthenticationProps.PasswordConfirmation]: string;
}

export interface LoginFormData {
    [AuthenticationProps.Email]: string;
    [AuthenticationProps.Password]: string;
}
