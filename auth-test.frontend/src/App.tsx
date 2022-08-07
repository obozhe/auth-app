import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import AdminRoutes from './modules/admin/routes';
import HomePage from './modules/home/containers/HomePage';
import UserRoutes from './modules/user/routes';
import UserApi from './modules/user/services/api/UserApi';
import Background from './shared/components/Background/Background';
import { CatSpinner } from './shared/components/CatSpinner/CatSpinner';
import ContainerWithHeader from './shared/containers/ContainerWithHeader';
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
                                <ContainerWithHeader>
                                    <HomePage />
                                </ContainerWithHeader>
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
