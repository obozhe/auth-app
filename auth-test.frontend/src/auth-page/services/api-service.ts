import { AuthenticationProps } from '../consts/authentication-props';
import { LoginFormData, RegistrationFormData } from '../models/form-data';

export const loginUser = (formData: LoginFormData) => {
    return fetch('/api/authorization/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            [AuthenticationProps.Email]: formData[AuthenticationProps.Email],
            [AuthenticationProps.Password]: formData[AuthenticationProps.Password],
        }),
    })
        .then((response) => response.json())
        .catch((err) => console.log('hi'));
};

export const registerUser = (formData: RegistrationFormData) => {
    return fetch('/api/authorization/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            [AuthenticationProps.FirstName]: formData[AuthenticationProps.FirstName],
            [AuthenticationProps.LastName]: formData[AuthenticationProps.LastName],
            [AuthenticationProps.Email]: formData[AuthenticationProps.Email],
            [AuthenticationProps.Password]: formData[AuthenticationProps.Password],
        }),
    }).then((response) => response.json());
};
