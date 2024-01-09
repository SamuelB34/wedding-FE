import axios from "axios";
import { getToken } from "@/shared/functions/getToken";
const jwt = require("jsonwebtoken");

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const verifyToken = (token: string) => {
  const decoded: {
    user_id: string;
    user_name: string;
    user_role: string;
    iat: number;
    exp: number;
  } = jwt.decode(token);
  if (decoded) {
    localStorage.setItem("id", decoded.user_id);
    localStorage.setItem("role", decoded.user_role);

    return { status: "Succeed", id: decoded.user_id };
  } else {
    return { status: "Error", id: "" };
  }
};

export const login = async (data: { username: string; password: string }) => {
  const response = await serverApi.post("/auth", data);
  return response.data;
};

export const getUserById = async (id: string) => {
  const serverApiAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const response = await serverApiAuth.get(`/users/${id}`);
  return response.data;
};
