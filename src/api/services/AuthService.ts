import { Api } from "../axios-config";
import type { StatusProps, UserPasswordProps } from "./UsersService";

export interface UserProps {
  id: number;
  name: string;
  email: string;
  roles: {
    name: string;
  }
}

type LoginProps = {
  token: string;
  user: UserProps;
  firstAccess: boolean
};

const login = async (values: Record<string, unknown>): Promise<LoginProps | Error> => {
  try {
    const { data } = await Api.post(`/auth/login`, values);

    if (data) {
      const responseUser = await Api.get("/auth/me", {
        headers: { Authorization: `Bearer ${data.token}` }
      });

      Api.defaults.headers.Authorization = `Bearer ${data.token}`;

      return {
        token: data.token,
        user: responseUser.data,
        firstAccess: responseUser.data.first_access
      };
    }

    return new Error;
  } catch (error: any) {
    return new Error(error.response?.data?.error || "Erro ao realizar o login");
  }
};

const validateToken = async (token: string) => {
  try {
    const { data } = await Api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    });

    return data;
  } catch (error: any) {
    return new Error(error.response?.data?.error || "Erro ao validar o token");
  }
}

const firstAccess = async (values: UserPasswordProps): Promise<StatusProps | Error> => {
  try {
    const response = await Api.post(`/auth/first-access`, values);

    if (response) {
      return response;
    }

    return new Error;
  } catch (error: any) {
    return new Error(error.response?.data?.error || "Erro ao atualizar o registro");
  }
}

const password = async (values: UserPasswordProps): Promise<StatusProps | Error> => {
  try {
    const response = await Api.post(`/auth/password`, values);

    if (response) {
      return response;
    }

    return new Error;
  } catch (error: any) {
    return new Error(error.response?.data?.error || "Erro ao atualizar o registro");
  }
}

const logout = async () => {
  try {
    const response = await Api.post(`/auth/logout`);
    Api.defaults.headers.Authorization = null;

    if (response) {
      return response;
    }

    return new Error;
  } catch (error: any) {
    return new Error(error.response?.data?.error || "Erro ao realizar o logout");
  }
}

export const AuthService = { login, validateToken, firstAccess, password, logout };
