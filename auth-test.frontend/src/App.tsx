import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Background from './core/components/background/background';
import Notification from './core/components/notification';
import AdminPage from './modules/admin-page/containers/admin-page';
import HomePage from './modules/home-page/containers/home-page';
import { UserRoles } from './modules/user/consts/user-roles';
import SignInPage from './modules/user/containers/sign-in-page';
import SignUpPage from './modules/user/containers/sign-up-page';
import UserApi from './modules/user/services/user-api';
import { CatSpinner } from './shared/components/cat-spinner/cat-spinner';
import GuardedRoute from './shared/components/guarded-route';
import { RootState } from './store/store';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ba68c8',
        },
        secondary: {
            main: '#94a3b8',
        },
    },
});

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector(({ user }: RootState) => user);
    const isAdmin = user?.role === UserRoles.Admin;

    useEffect(() => {
        UserApi.fetchUser().finally(() => setIsLoading(false));
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 absolute h-screen w-screen bottom-0 left-0 top-0 right-o flex">
                {isLoading ? (
                    <CatSpinner />
                ) : (
                    <Routes>
                        <Route path="" element={<Navigate to={!user ? 'sign-in' : 'home'} />} />
                        <Route
                            path="home"
                            element={
                                <GuardedRoute isAllowed={!!user} redirectTo="/sign-in">
                                    <HomePage />
                                </GuardedRoute>
                            }
                        />
                        <Route
                            path="admin"
                            element={
                                <GuardedRoute isAllowed={isAdmin} redirectTo="/home">
                                    <AdminPage />
                                </GuardedRoute>
                            }
                        />
                        <Route
                            path="sign-in"
                            element={
                                <GuardedRoute isAllowed={!user} redirectTo="/home">
                                    <SignInPage />
                                </GuardedRoute>
                            }
                        />
                        <Route
                            path="sign-up"
                            element={
                                <GuardedRoute isAllowed={!user} redirectTo="/home">
                                    <SignUpPage />
                                </GuardedRoute>
                            }
                        />
                    </Routes>
                )}
            </div>
            <Notification />
            <Background />
        </ThemeProvider>
    );
}

export default App;
