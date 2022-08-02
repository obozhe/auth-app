import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Background from './core/components/background/background';
import Header from './core/components/header';
import Notification from './core/components/notification';
import AdminPage from './modules/admin-page/containers/admin-page';
import HomePage from './modules/home-page/containers/home-page';
import { UserRoles } from './modules/user/consts/user-roles';
import SignInPage from './modules/user/containers/sign-in-page';
import SignUpPage from './modules/user/containers/sign-up-page';
import VerificationPage from './modules/user/containers/verification-page';
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
            <div className="flex flex-col relative w-full h-full">
                <Header />
                {isLoading ? (
                    <CatSpinner />
                ) : (
                    <div className="max-w-[1600px] h-full w-full mx-auto flex">
                        <Routes>
                            <Route path="" element={<Navigate to={!user ? 'user' : 'home'} />} />
                            <Route
                                path="home"
                                element={
                                    <GuardedRoute isAllowed={!!user} redirectTo="/user">
                                        <HomePage />
                                    </GuardedRoute>
                                }
                            />
                            <Route
                                path="admin"
                                element={
                                    <GuardedRoute isAllowed={isAdmin} redirectTo="/user">
                                        <AdminPage />
                                    </GuardedRoute>
                                }
                            />
                            <Route path="user">
                                <Route path="" element={<Navigate to="sign-in" />} />
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
                                <Route path="verify/:userId/:token" element={<VerificationPage />} />
                            </Route>
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </div>
                )}
            </div>
            <Notification />
            <Background />
        </ThemeProvider>
    );
}

export default App;
