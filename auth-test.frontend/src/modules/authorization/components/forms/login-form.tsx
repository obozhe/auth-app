import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import axiosApi from '../../../../core/axios-http-interceptor';
import Input from '../../../../shared/components/input';
import { store } from '../../../../store/store';
import { UserModel } from '../../../../store/user/models/user-model';
import { setUser } from '../../../../store/user/user.store';
import { AuthenticationProps } from '../../consts/authentication-props';
import { LoginFormData } from '../../models/form-data';
import AuthorizationApi from '../../services/authorization-api';
import { PasswordField } from '../form-fields';

const SignupSchema = Yup.object().shape({
    [AuthenticationProps.Email]: Yup.string().max(255).email('Invalid email').required('Email is required'),
    [AuthenticationProps.Password]: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .max(255)
        .required('Password is required'),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const loginUser = (formData: LoginFormData) =>
        AuthorizationApi.signIn(formData).then(() => navigate('/home', { replace: true }));

    return (
        <div>
            <Formik
                initialValues={{
                    [AuthenticationProps.Email]: '',
                    [AuthenticationProps.Password]: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={(formData: LoginFormData, actions: FormikHelpers<LoginFormData>) =>
                    loginUser(formData).finally(() => actions.setSubmitting(false))
                }
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit} className="grid gap-2">
                        <Input
                            label="Email"
                            name={AuthenticationProps.Email}
                            value={values[AuthenticationProps.Email]}
                            startIcon={faAt}
                            error={touched[AuthenticationProps.Email] && errors[AuthenticationProps.Email]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></Input>

                        <PasswordField
                            label="Password"
                            name={AuthenticationProps.Password}
                            value={values[AuthenticationProps.Password]}
                            startIcon={faKey}
                            error={touched[AuthenticationProps.Password] && errors[AuthenticationProps.Password]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <Button variant="contained" size="large" type="submit" disabled={isSubmitting}>
                            Login
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default LoginForm;
