import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Background from './core/components/background/background';
import ContainerWithHeader from './core/containers/container-with-header';
import AdminRoutes from './modules/admin-page/routes';
import HomePage from './modules/home-page/containers/home-page';
import UserRoutes from './modules/user/routes';
import UserApi from './modules/user/services/user-api';
import { CatSpinner } from './shared/components/CatSpinner/CatSpinner';
import GuardedRoute from './shared/components/GuardedRoute';
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

    useEffect(() => {
        UserApi.fetchUser().finally(() => setIsLoading(false));
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div className="relative w-screen h-screen overflow-hidden">
                {isLoading ? (
                    <CatSpinner />
                ) : (
                    <Routes>
                        <Route
                            path=""
                            element={
                                <GuardedRoute isAllowed={!!user} redirectTo="/user">
                                    <ContainerWithHeader>
                                        <HomePage />
                                    </ContainerWithHeader>
                                </GuardedRoute>
                            }
                        />
                        <Route path="admin">{AdminRoutes(user)}</Route>
                        <Route path="user">{UserRoutes(user)}</Route>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                )}
            </div>
            <Background />
        </ThemeProvider>
    );
}

export default App;
