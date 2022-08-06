import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ErrorDto } from '../../../core/models/error-dto';
import { CatSpinner } from '../../../shared/components/CatSpinner/CatSpinner';
import UserApi from '../services/user-api';

const VerificationPage = () => {
    const { userId, token } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ErrorDto | null>(null);

    useEffect(() => {
        if (!userId || !token) {
            navigate('/', { replace: true });
        } else {
            UserApi.verify(userId, token)
                .then(() => setTimeout(() => navigate('/', { replace: true }), 3000))
                .catch((e) => setError(e))
                .finally(() => setIsLoading(false));
        }
    }, []);

    return isLoading ? (
        <CatSpinner />
    ) : (
        <div className="w-full flex flex-col justify-center items-center text-white">
            <div className={`p-4 rounded-xl  shadow-xl text-soft-white ${error ? 'bg-error' : 'bg-success'}`}>
                <div className="grid grid-cols-[auto_auto] gap-4 items-center">
                    <FontAwesomeIcon size="3x" icon={error ? faXmarkCircle : faCheckCircle} />
                    <div>
                        <h1 className="text-2xl bold">{error ? 'Something went wrong' : 'Email is verified!'}</h1>
                        <p>{error ? error.description : 'You will be redirected to the home page soon'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationPage;
