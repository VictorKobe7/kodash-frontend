import { Api } from "../axios-config";

export interface UserProps {
  id?: number;
  name: string;
  email: string;
  password?: string | null;
  cpf: string;
  role_id?: string;
  status: string;
  first_access?: number;
}

export interface UserPasswordProps {
  id?: number;
  password: string;
}

type GetAllProps = {
  data: UserProps[];
};

export interface StatusProps {
  status: number
}

const getAll = async (): Promise<GetAllProps | Error> => {
  try {
    const { data } = await Api.get(`/users`);

    if (data) {
      return { data };
    }

    return new Error;
  } catch (error: any) {
    return new Error(error.response?.data?.error || "Erro ao listar os registros");
  }
};

const getById = async (id: number): Promise<UserProps | Error> => {
  try {
    const { data } = await Api.get(`/users/${id}`);

    if (data) {
      return data;
    }

    return new Error;
  } catch (error: any) {
    return new Error(error.response?.data?.error || "Erro ao exibir o registro");
  }
};

const create = async (values: Omit<UserProps, "id">): Promise<StatusProps | Error> => {
  try {
    const response = await Api.post<UserProps>("/users", values);

    if (response) {
      return response;
    }

    throw new Error;
  } catch (error: any) {
    return new Error(error.response?.data?.error || "Erro ao realizar o cadastro.");
  }
};

const updateById = async (id: number, values: UserProps) => {
  try {
    const response = await Api.put(`/users/${id}`, values);

    if (response) {
      return response;
    }

    return new Error;
  } catch (error: any) {
    const customError = new Error(
      error.response?.data?.error || "Erro ao atualizar o registro"
    );

    (customError as any).messages = error.response?.data?.error || [];

    throw customError;
  }
};

const updatePassword = async (id: number, values: UserPasswordProps): Promise<StatusProps | Error> => {
  try {
    const response = await Api.put(`/users/password/${id}`, values);

    if (response) {
      return response;
    }

    return new Error;
  } catch (error: any) {
    return new Error(error.response?.data?.error || "Erro ao atualizar o registro.");
  }
};

const deleteById = async (id: number): Promise<StatusProps | Error> => {
  try {
    const response = await Api.delete(`/users/${id}`);

    if (response) {
      return response;
    }

    return new Error;
  } catch (error: any) {
    return new Error(error.response?.data?.error || "Erro ao excluir o registro.");
  }
};

export const UsersService = {
  getAll,
  getById,
  create,
  updateById,
  updatePassword,
  deleteById
};
