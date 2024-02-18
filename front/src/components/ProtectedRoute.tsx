import { Navigate } from 'react-router-dom';
import { User } from '../dto/User';

type ProtectedRouteProps = {
  isAuthLoading: boolean;
  user: User | null;
  children: React.ReactNode;
};

const ProtectedRoute = ({
  isAuthLoading,
  user,
  children,
}: ProtectedRouteProps) => {
  console.log('pr', user);
  if (isAuthLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
