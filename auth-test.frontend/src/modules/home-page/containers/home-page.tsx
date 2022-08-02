import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootState } from '../../../store/store';
import { UserModel } from '../../user/models/user-model';

const HomePage = () => {
    const user: UserModel = useSelector(({ user }: RootState) => user) as UserModel;

    return !user ? <Navigate replace to="/sign-in" /> : <div className="m-auto"></div>;
};

export default HomePage;
