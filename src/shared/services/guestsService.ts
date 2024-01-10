import axios from "axios";
import { getToken } from "@/shared/functions/getToken";

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getGuests = async (params?: {
  p: number;
  pp: number;
  search?: string;
}) => {
  const body = params || {
    p: 1,
    pp: 10,
  };

  const response = await serverApi.get("/guests", { params: body });
  return response.data;
};

export const getTotalCount = async (search?: string, filter?: string) => {
  let config: any = search ? { params: { search: search } } : undefined;

  if (config && filter) {
    config = { params: { search: search, filter: filter } };
  } else if (!config && filter) {
    config = { params: { filter: filter } };
  }

  const response = await serverApi.get("/guests/total-count", config);
  return response.data;
};

export const createGuest = async (body: any) => {
  body = Object.assign({ ...body, assist: false, saw_invitation: false });
  if (!body.table || !body.table.length) {
    delete body.table;
  }
  if (!body.group || !body.group.length) {
    delete body.group;
  }
  const response = await serverApi.post("/guests", body);
  return response.data;
};

export const updateGuest = async (id: string, body: any) => {
  body = Object.assign({ ...body, assist: false, saw_invitation: false });
  if (!body.table || !body.table.length) {
    delete body.table;
  }
  if (!body.group || !body.group.length) {
    delete body.group;
  }
  const response = await serverApi.put(`/guests/${id}`, body);
  return response.data;
};

export const deleteGuest = async (id: string) => {
  const response = await serverApi.delete(`/guests/${id}`);
  return response.data;
};
