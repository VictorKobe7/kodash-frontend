import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthService, type UserProps } from "../api/services/AuthService";
import { useNavigate } from "react-router";

interface AuthContextData {
  login: (data: Record<string, unknown>) => Promise<Error | void>;
  logout: () => void;
  isLoggedIn: boolean;
  user: UserProps | null;
  loading: boolean
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      AuthService.validateToken(storedToken).then((response) => {
        if (!(response instanceof Error)) {
          setToken(storedToken);
          setUser(response);
        } else {
          logout();
        }
      }).catch(() => {
        logout();
      }).finally(() => {
        setLoading(false)
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (data: Record<string, unknown>): Promise<Error | void> => {
    try {
      const result = await AuthService.login(data);

      if (result instanceof Error) {
        return new Error(result.message);
      }

      localStorage.setItem("token", result.token);
      setToken(result.token);
      setUser(result.user);

      navigate("/home");
    } catch (error: any) {
      return new Error(error.message);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const response = await AuthService.logout();

      if (response instanceof Error) {
        throw new Error(response.message);
      }

      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      navigate("/login");
    } catch (error: any) {
      return new Error(error.message);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoggedIn: !!token, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
