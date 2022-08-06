import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import SignInForm from '../components/forms/SignInForm';

const SignInPage = () => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="flex flex-col m-auto max-w-md w-full">
                <div className="container shadow-xl bg-white rounded-lg p-4">
                    <SignInForm />
                </div>
                <div className="flex justify-between items-center  mt-1">
                    <Link to="../sign-up">
                        <Button className="normal-case text-white text-opacity-80" size="small">
                            Don`t have an account?
                        </Button>
                    </Link>

                    <Button
                        className="normal-case font-light text-white text-opacity-80"
                        color="secondary"
                        href="/"
                        size="small"
                    >
                        Restore password
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
