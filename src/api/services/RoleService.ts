import { Api } from "../axios-config";

export interface RoleProps {
  id?: string;
  name: string;
}

type GetAllProps = {
  data: RoleProps[];
};

interface StatusProps {
  status: number
}

const getAll = async (): Promise<GetAllProps | Error> => {
  try {
    const { data } = await Api.get(`/roles`);

    if (data) {
      return { data }
    }

    return new Error;
  } catch (error: any) {
    return new Error(error.response?.data?.error || "Erro ao listar os registros");
  }
};

const getById = async (id: number): Promise<RoleProps | Error> => {
  try {
    const { data } = await Api.get(`/roles/${id}`);

    if (data) {
      return data;
    }

    return new Error;
  } catch (error: any) {
    return new Error(error.response?.data?.error || "Erro ao exibir o registro");
  }
};

const create = async (values: Omit<RoleProps, "id">): Promise<StatusProps | Error> => {
  try {
    const response = await Api.post<RoleProps>("/roles", values);

    if (response) {
      return response;
    }

    return new Error;
  } catch (error: any) {
    return new Error(error.response?.data?.error || "Erro ao realizar o cadastro.");
  }
};

const updateById = async (id: number, values: RoleProps): Promise<StatusProps | Error> => {
  try {
    const response = await Api.put(`/roles/${id}`, values);

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
    const response = await Api.delete(`/roles/${id}`);

    if (response) {
      return response;
    }

    return new Error;
  } catch (error: any) {
    return new Error(error.response?.data?.error || "Erro ao excluir o registro.");
  }
};

export const RolesService = { getAll, getById, create, updateById, deleteById };
