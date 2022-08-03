import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const VerificationPage = () => (
    <div className="w-fit h-fit flex flex-col justify-center items-center text-white m-auto  rounded-md p-2">
        <div className=" rounded-md text-success p-4 bg-soft-white shadow-xl">
            <div className="grid grid-cols-[auto_auto] gap-4 items-center">
                <FontAwesomeIcon size="3x" icon={faEnvelopeCircleCheck} />
                <div>
                    <h1 className="text-2xl bold">Verification email is sent!</h1>
                    <p>Please check your inbox</p>
                </div>
            </div>
        </div>
        <div className="flex justify-center items-center w-full mt-1 text-gray-blue">
            <Link to="..">
                <Button
                    className="normal-case font-light text-soft-white text-opacity-80"
                    color="secondary"
                    size="small"
                >
                    Back to Login
                </Button>
            </Link>
        </div>
    </div>
);

export default VerificationPage;
