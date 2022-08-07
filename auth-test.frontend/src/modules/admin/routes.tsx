import { Navigate, Route } from 'react-router-dom';

import GuardedRoute from '../../shared/components/GuardedRoute';
import ContainerWithHeader from '../../shared/containers/ContainerWithHeader';
import { isAdmin } from '../user/helpers/user.helper';
import { UserDto } from '../user/models/User';
import { AdminPaths } from './consts/AdminPaths';
import AdminPage from './containers/AdminPage';

const AdminRoutes = (user: UserDto | null) => (
    <>
        <Route path="" element={<Navigate to="users" />} />
        <Route
            path={AdminPaths.Users}
            element={
                <GuardedRoute isAllowed={isAdmin(user)} redirectTo="/">
                    <div className="w-full grid grid-rows-[auto_1fr]">
                        <ContainerWithHeader>
                            <AdminPage />
                        </ContainerWithHeader>
                    </div>
                </GuardedRoute>
            }
        />
        <Route
            path={AdminPaths.BanList}
            element={
                <GuardedRoute isAllowed={isAdmin(user)} redirectTo="/">
                    <div className="w-full grid grid-rows-[auto_1fr]">
                        <ContainerWithHeader>
                            <AdminPage />
                        </ContainerWithHeader>
                    </div>
                </GuardedRoute>
            }
        />
    </>
);

export default AdminRoutes;
