import axios from "axios";
const jwt = require("jsonwebtoken");

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {},
});

export const verifyToken = (token: string) => {
  const decoded = jwt.decode(token);
  console.log(decoded);
};

export const login = async (data: { username: string; password: string }) => {
  const response = await serverApi.post("/auth", data);
  return response.data;
};
