import axios from "axios";
import type { UsersApiType } from "../../types/zodTypes.ts";

const setting = {
  withCredentials: true,
  headers: {},
};
const instance = axios.create({
  baseURL: "https://task4-login-form-server.vercel.app/api/uk/",
  ...setting,
});

//api
export const usersAPI = {
  getUsers() {
    const promise = instance.get<GetUsersResponseWrapper>("users");
    return promise;
  },
  getUser(id: number) {
    const promise = instance.get<ResponseType>(`user/${id}`);
    return promise;
  },
  createUser(username: string, email: string, password: string) {
    const promise = instance.post<ResponseType>("adduser", {
      username,
      email,
      password,
      blocked: false,
    });
    return promise;
  },
  deleteUser(id: number) {
    const promise = instance.delete(`user/${id}`);
    return promise;
  },
  updateUser(
    id: number,
    username: string,
    email: string,
    password: string,
    blocked: boolean = false
  ) {
    const promise = instance.put<ResponseType>(`user/${id}`, {
      username,
      email,
      password,
      blocked,
    });
    return promise;
  },
  loginUser(username: string, password: string) {
    const promise = instance.post<LoginResponseType>("login", {
      username,
      password,
    });
    return promise;
  },
};

//types
type ResponseType = {
  success: boolean;
  data: {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: string;
    blocked: 0 | 1;
    last_login: string;
  };
};

type LoginResponseType = {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    created_at: string;
    blocked: 0 | 1;
    last_login: string;
  };
};

type GetUsersResponseWrapper = {
  data: UsersApiType[];
};
