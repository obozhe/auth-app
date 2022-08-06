import { Navigate, Route } from 'react-router-dom';

import GuardedRoute from '../../shared/components/GuardedRoute';
import SignInPage from './containers/sign-in-page';
import SignUpPage from './containers/sign-up-page';
import VerificationMailSentPage from './containers/verification-mail-sent-page';
import VerificationPage from './containers/verification-page';
import { UserDto } from './models/user';

const UserRoutes = (user: UserDto | null) => (
    <>
        <Route path="" element={<Navigate to="sign-in" />} />
        <Route
            path="sign-in"
            element={
                <GuardedRoute isAllowed={!user} redirectTo="/">
                    <SignInPage />
                </GuardedRoute>
            }
        />
        <Route
            path="sign-up"
            element={
                <GuardedRoute isAllowed={!user} redirectTo="/">
                    <SignUpPage />
                </GuardedRoute>
            }
        />
        <Route
            path="email-verification-is-sent"
            element={
                <GuardedRoute isAllowed={!user} redirectTo="/">
                    <VerificationMailSentPage />
                </GuardedRoute>
            }
        />
        <Route path="verify/:userId/:token" element={<VerificationPage />} />
    </>
);

export default UserRoutes;
