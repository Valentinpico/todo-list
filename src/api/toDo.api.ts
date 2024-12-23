import { responseApiType, TodoDraft } from "../types/types";

import { API_URL } from "../utils/constants.ts";

export const addTodoApi = async ({
  todo,
  token,
  userId,
}: {
  todo: TodoDraft;
  token: string;
  userId: string;
}) => {
  const todoWithUserId = { ...todo, userId };
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
  token,
}: {
  todo: TodoDraft;
  id: string;
  token: string;
}) => {
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

export const deleteTodoApi = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
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
