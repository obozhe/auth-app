import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootState } from '../../../store/store';
import { UserModel } from '../../../store/user/models/user-model';
import AuthorizationApi from '../../authorization/services/authorization-api';

const HomePage = () => {
    const user: UserModel = useSelector(({ user }: RootState) => user) as UserModel;

    return !user ? (
        <Navigate replace to="/" />
    ) : (
        <div>
            <div>HI, {user.firstName}!</div>
            <Button variant="contained" onClick={AuthorizationApi.signOut}>
                Logout
            </Button>
        </div>
    );
};

export default HomePage;
