import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootState } from '../../../store/store';
import { UserDto } from '../../user/models/user';

const HomePage = () => {
    const user: UserDto = useSelector(({ user }: RootState) => user) as UserDto;

    return !user ? <Navigate replace to="/sign-in" /> : <div className="m-auto"></div>;
};

export default HomePage;
