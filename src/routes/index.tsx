import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import { useDrawerContext } from "../contexts/DrawerContext";
import { AuthLayout } from "../layouts/Auth";
import { Base } from "../layouts/Base";
import { Login } from "../pages/auth/Login";
import { Password } from "../pages/auth/Password";
import { Dashboard } from "../pages/dashboard";
import { Roles } from "../pages/roles";
import { Users } from "../pages/users";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/home",
        label: "Home"
      },
      {
        icon: "people",
        path: "/usuarios",
        label: "Usuários",
        rules: ["Admin"]
      },
      {
        icon: "people",
        path: "/perfis",
        label: "Perfis",
        rules: ["Admin"]
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Password page="forgot-password" />} />
        <Route path="/first-access" element={<Password page="first-access" />} />
      </Route>

      <Route element={<Base />}>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/usuarios" element={<Users />} />
        <Route path="/perfis" element={<Roles />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  )
}
