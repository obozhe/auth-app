import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { RootState } from '../../../store/store';
import { UserModel } from '../../user/models/user-model';
import UserApi from '../../user/services/user-api';

const HomePage = () => {
    const user: UserModel = useSelector(({ user }: RootState) => user) as UserModel;

    return !user ? (
        <Navigate replace to="/sign-in" />
    ) : (
        <div className="m-auto">
            <div>HI, {user.firstName}!</div>
            <Button variant="contained" onClick={UserApi.signOut}>
                Logout
            </Button>

            <Link to="/admin">
                <Button variant="contained">admin</Button>
            </Link>
        </div>
    );
};

export default HomePage;
