import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ErrorDto } from '../../../core/models/error-dto';
import { CatSpinner } from '../../../shared/components/cat-spinner/cat-spinner';
import UserApi from '../services/user-api';

const VerificationPage = () => {
    const { userId, token } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ErrorDto | null>(null);

    useEffect(() => {
        if (userId && token) {
            UserApi.verify(userId, token)
                .then(() => setTimeout(() => navigate('/home', { replace: true }), 3000))
                .catch((e) => setError(e))
                .finally(() => setIsLoading(false));
        }
    }, []);

    return isLoading ? (
        <CatSpinner />
    ) : (
        <div className="w-full flex flex-col justify-center items-center text-white">
            {error ? (
                <Paper className="p-4 bg-error text-white">
                    <h1 className="text-2xl bold">Something went wrong</h1>
                    <p>{error.description}</p>
                </Paper>
            ) : (
                <>
                    <h1 className="text-2xl bold">Email is verified!</h1>
                    <p>You will be redirected to the home page soon</p>
                </>
            )}
        </div>
    );
};

export default VerificationPage;
