import { create } from "zustand";
import { TodoDraft, TodoType } from "../types/types";

export type TodoStoreType = {
  todos: TodoType[];
  setTodos: (todos: TodoType[]) => void;
  todoSelected: TodoType | null;
  setTodoSelected: (todo: TodoType | null) => void;
  addTodo: (todo: TodoDraft) => void;
  toggleTodo: (id: TodoType["id"]) => void;
  deleteTodo: (id: TodoType["id"]) => void;
  updateTodo: (todo: TodoType) => void;
};

export const useTodoStore = create<TodoStoreType>((set) => ({
  todos: [],
  setTodos: (todos) => {
    set(() => ({
      todos: todos,
    }));
  },
  todoSelected: null,
  setTodoSelected: (todo) => {
    set(() => ({
      todoSelected: todo,
    }));
  },
  addTodo: (todo) => {
    set((state) => ({
      todos: [
        {
          id: "",
          ...todo,
        },
        ...state.todos,
      ],
    }));
  },

  toggleTodo: (id) => {
    set((state) => {
      const todotoggle = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      return {
        todos: todotoggle.sort((a, b) =>
          a.completed === b.completed ? 0 : a.completed ? 1 : -1
        ),
      };
    });
  },

  deleteTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  updateTodo: (todo) => {
    set((state) => ({
      todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
    }));
  },
}));
