import { faAt, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import { Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import Input from '../../../../shared/components/input';
import { AuthenticationProps } from '../../consts/authentication-props';
import { SignUpFormData } from '../../models/form-data';
import UserApi from '../../services/user-api';
import { PasswordField } from '../form-fields';

const SignupSchema = yup.object().shape({
    [AuthenticationProps.Email]: yup.string().max(255).email('Invalid email').required('Email is required'),
    [AuthenticationProps.Password]: yup
        .string()
        .min(8, 'Must be at least 8 characters')
        .max(255)
        .required('Password is required'),
    [AuthenticationProps.PasswordConfirmation]: yup
        .string()
        .min(8, 'Must be at least 8 characters')
        .max(255)
        .required('Password confirmation is required')
        .oneOf([yup.ref(AuthenticationProps.Password), null], 'Passwords should be the same'),
    [AuthenticationProps.FirstName]: yup
        .string()
        .min(2, 'Must be at least 2 characters')
        .max(255)
        .required('First name is required'),
    [AuthenticationProps.LastName]: yup.string().min(2).max(255).required('Last name is required'),
});

const SignUpForm = () => {
    const navigate = useNavigate();
    const signUp = (formData: SignUpFormData) =>
        UserApi.signUp(formData).then(() => navigate('../email-verification-is-sent'));

    return (
        <Formik
            initialValues={{
                [AuthenticationProps.FirstName]: '',
                [AuthenticationProps.LastName]: '',
                [AuthenticationProps.Email]: '',
                [AuthenticationProps.Password]: '',
                [AuthenticationProps.PasswordConfirmation]: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(formData: SignUpFormData, actions: FormikHelpers<SignUpFormData>) =>
                signUp(formData).finally(() => actions.setSubmitting(false))
            }
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="grid gap-2">
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            label="First Name"
                            name={AuthenticationProps.FirstName}
                            value={values[AuthenticationProps.FirstName]}
                            startIcon={faUser}
                            error={touched[AuthenticationProps.FirstName] && errors[AuthenticationProps.FirstName]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></Input>
                        <Input
                            label="Last Name"
                            name={AuthenticationProps.LastName}
                            value={values[AuthenticationProps.LastName]}
                            startIcon={faUser}
                            error={touched[AuthenticationProps.LastName] && errors[AuthenticationProps.LastName]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></Input>
                    </div>
                    <Input
                        label="Email"
                        type="email"
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
                    <PasswordField
                        label="Confirm Password"
                        name={AuthenticationProps.PasswordConfirmation}
                        value={values[AuthenticationProps.PasswordConfirmation]}
                        startIcon={faKey}
                        error={
                            touched[AuthenticationProps.PasswordConfirmation] &&
                            errors[AuthenticationProps.PasswordConfirmation]
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <Button variant="contained" size="large" type="submit" disabled={isSubmitting}>
                        Register
                    </Button>
                </form>
            )}
        </Formik>
    );
};

export default SignUpForm;
