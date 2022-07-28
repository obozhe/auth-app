import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Background from './core/components/background/background';
import Notification from './core/components/notification';
import LoginPage from './modules/authorization/containers/login-page';
import RegisterPage from './modules/authorization/containers/register-page';
import AuthorizationApi from './modules/authorization/services/authorization-api';
import HomePage from './modules/home-page/containers/home-page';
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

AuthorizationApi.getUser();

function App() {
    const isAuthenticated: boolean = useSelector(({ user }: RootState) => !!user);

    return (
        <ThemeProvider theme={theme}>
            <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 absolute h-screen w-screen bottom-0 left-0 top-0 right-o flex justify-center items-center">
                <Routes>
                    <Route path="" element={<Navigate to="home" />} />
                    <Route path="home" element={isAuthenticated ? <HomePage /> : <Navigate to={`/login`} />} />
                    <Route path="login" element={isAuthenticated ? <Navigate replace to={`/home`} /> : <LoginPage />} />
                    <Route
                        path="register"
                        element={isAuthenticated ? <Navigate replace to={`/home`} /> : <RegisterPage />}
                    />
                </Routes>
            </div>
            <Notification />
            <Background />
        </ThemeProvider>
    );
}

export default App;
