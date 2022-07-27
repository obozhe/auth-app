import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import LoginForm from '../components/forms/login-form';

const LoginPage = () => {
    return (
        <div className="flex flex-col max-w-md w-full">
            <div className="container shadow-xl bg-white rounded-lg p-4">
                <LoginForm />
            </div>
            <div className="flex justify-between items-center  mt-1">
                <Link to={'/register'}>
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
    );
};

export default LoginPage;
