import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps): any => {
  const { isLoggedIn, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!isLoggedIn) {
      navigate("login", { replace: true });
    }
  }, [isLoggedIn, navigate, loading]);

  return children;
};

export default AuthGuard;
