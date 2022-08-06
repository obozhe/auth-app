import { Navigate, Route } from 'react-router-dom';

import GuardedRoute from '../../shared/components/GuardedRoute';
import SignInPage from './containers/SignInPage';
import SignUpPage from './containers/SignUpPage';
import VerificationMailSentPage from './containers/VerificationMailSentPage';
import VerificationPage from './containers/VerificationPage';
import { UserDto } from './models/User';

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
