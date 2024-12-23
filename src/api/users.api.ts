import { responseApiType } from "../types/types";
import { loginType, UserDraftType } from "../types/types.user";

import { API_URL } from "../utils/constants.ts";
import { jwtDecode, JwtPayload as BaseJwtPayload } from "jwt-decode";

interface JwtPayload extends BaseJwtPayload {
  userId: string;
}

export const createUserApi = async (user: UserDraftType) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: responseApiType = await response.json();
    return data;
  } catch (error) {
    return { message: "Error en el servidor", success: false, data: null };
  }
};

export const loginUserApi = async (user: loginType) => {
  const loginData = {
    email: user.emailOrUsername,
    username: user.emailOrUsername,
    password: user.password,
  };

  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: responseApiType = await response.json();
    return data;
  } catch (error) {
    return { message: "Error en el servidor", success: false, data: null };
  }
};

export const getUserWithToDosApi = async (token: string) => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const id = decoded.userId;
    if (!id) {
      return {
        message: "No se pudo obtener el id del token",
        success: false,
        data: null,
      };
    }
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data: responseApiType = await response.json();
    return data;
  } catch (error) {
    return { message: "Error en el servidor", success: false, data: null };
  }
};
