import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";

interface GuestGuardProps {
  children: React.ReactNode;
}

const GuestGuard = ({ children }: GuestGuardProps): any => {
  const { isLoggedIn, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return children;
};

export default GuestGuard;
