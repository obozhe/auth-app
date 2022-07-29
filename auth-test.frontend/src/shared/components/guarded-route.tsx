import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

const GuardedRoute = ({
    children,
    isAllowed,
    redirectTo,
}: {
    children: ReactElement;
    isAllowed: boolean;
    redirectTo: string;
}) => {
    return isAllowed ? children : <Navigate to={redirectTo} />;
};
export default GuardedRoute;
