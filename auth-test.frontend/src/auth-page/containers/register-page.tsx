import { Link } from "react-router-dom"

import Button from "@mui/material/Button"

import RegisterForm from "../components/forms/register-form"

const RegisterPage = () => {
  return (
    <div className="flex flex-col max-w-md w-full">
      <div className="container shadow-xl bg-white rounded-lg p-4">
        <RegisterForm />
      </div>
      <Link className="w-fit mx-auto mt-3" to={'/login'}>
        <Button className="normal-case font-light w-fit text-white text-opacity-80" size="small">
          Back to Login
        </Button>
      </Link>
    </div>
  );
};

export default RegisterPage;
