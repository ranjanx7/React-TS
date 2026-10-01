import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
