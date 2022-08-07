import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import SignUpForm from '../components/forms/SignUpForm';
import UserPaths from '../consts/UserPaths';

const SignUpPage = () => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="flex flex-col m-auto max-w-md w-full">
                <div className="container shadow-xl bg-white rounded-lg p-4">
                    <SignUpForm />
                </div>
                <Link className="w-fit mx-auto mt-3" to={UserPaths.SignIn}>
                    <Button className="normal-case font-light w-fit text-white text-opacity-80" size="small">
                        Back to Login
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default SignUpPage;
