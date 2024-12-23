import { responseApiType, TodoDraft } from "../types/types";

import { API_URL } from "../utils/constants.ts";

export const addTodoApi = async ({
  todo,
  userId,
}: {
  todo: TodoDraft;
  userId: string;
}) => {
  const todoWithUserId = { ...todo, userId };

  const token = localStorage.getItem("token");

  if (token === "") {
    return {
      message: "No hay token",
      success: false,
      data: null,
      notoken: true,
    };
  }
  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      body: JSON.stringify(todoWithUserId),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data: responseApiType = await response.json();
    return data;
  } catch (error) {
    return { message: "Error en el servidor", success: false, data: null };
  }
};

export const updateTodoApi = async ({
  todo,
  id,
}: {
  todo: TodoDraft;
  id: string;
}) => {
  const token = localStorage.getItem("token");

  if (token === "") {
    return {
      message: "No hay token",
      success: false,
      data: null,
      notoken: true,
    };
  }

  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data: responseApiType = await response.json();
    return data;
  } catch (error) {
    return { message: "Error en el servidor", success: false, data: null };
  }
};

export const deleteTodoApi = async ({ id }: { id: string }) => {
  const token = localStorage.getItem("token");

  if (token === "") {
    return {
      message: "No hay token",
      success: false,
      data: null,
      notoken: true,
    };
  }
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: responseApiType = await response.json();
    return data;
  } catch (error) {
    return { message: "Error en el servidor", success: false, data: null };
  }
};
