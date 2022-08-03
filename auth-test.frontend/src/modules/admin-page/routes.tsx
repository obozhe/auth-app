import { Route } from 'react-router-dom';

import ContainerWithHeader from '../../core/containers/container-with-header';
import GuardedRoute from '../../shared/components/guarded-route';
import { isAdmin } from '../user/helpers/user.helper';
import { UserDto } from '../user/models/user';
import AdminPage from './containers/admin-page';

const AdminRoutes = (user: UserDto | null) => (
    <Route
        path=""
        element={
            <GuardedRoute isAllowed={isAdmin(user)} redirectTo="/user">
                <div className="w-full grid grid-rows-[auto_1fr]">
                    <ContainerWithHeader>
                        <AdminPage />
                    </ContainerWithHeader>
                </div>
            </GuardedRoute>
        }
    />
);

export default AdminRoutes;
