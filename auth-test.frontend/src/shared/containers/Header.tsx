import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AdminPaths } from '../../modules/admin/consts/AdminPaths';
import { isAdmin } from '../../modules/user/helpers/user.helper';
import { RootState } from '../../store/store';
import IconButton from '../components/IconButton';
import UserActions from '../components/header-actions/UserActions';

const Header = () => {
    const user = useSelector(({ user }: RootState) => user);

    return (
        <div className="w-full p-4">
            <div className="flex justify-between bg-soft-white rounded shadow-lg p-1">
                <div className="flex justify-between items-center ">
                    <Link to="/" className="font-bold px-4 select-none">
                        <span className="font-bold font-gothic text-2xl text-gray-blue logo">OBOZHE</span>
                    </Link>
                </div>
                <div className="flex justify-between items-center">
                    {isAdmin(user) && (
                        <Link to={AdminPaths.Users}>
                            <IconButton title="Admin page" className="w-10 h-10 mr-1 text-gray-blue">
                                <FontAwesomeIcon size="lg" icon={faCrown} />
                            </IconButton>
                        </Link>
                    )}

                    <UserActions />
                </div>
            </div>
        </div>
    );
};
export default Header;
