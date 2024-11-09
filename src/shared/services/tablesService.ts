import { getToken } from "@/shared/functions/getToken";
import axios from "axios";

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const getGroups = async () => {
  const response = await serverApi.get("/tables", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};
