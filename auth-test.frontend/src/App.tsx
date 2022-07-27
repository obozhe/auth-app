import { Route, Routes } from "react-router-dom"

import { createTheme, ThemeProvider } from "@mui/material/styles"

import LoginPage from "./auth-page/containers/login-page"
import RegisterPage from "./auth-page/containers/register-page"
import Background from "./core/components/background/background"

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
  return (
    <ThemeProvider theme={theme}>
      <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 absolute h-screen w-screen bottom-0 left-0 top-0 right-o flex justify-center items-center">
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </div>
      <Background />
    </ThemeProvider>
  );
}

export default App;
