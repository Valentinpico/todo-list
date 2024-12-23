import { create } from "zustand";
import { UserDTO } from "../types/types.user";

export type UtilsStoreUser = {
  token: string;
  setToken: (token: string) => void;
  user: UserDTO;
  setUser: (user: UserDTO) => void;
};

export const useStoreUser = create<UtilsStoreUser>((set) => ({
  token: "",
  setToken: (token) => set({ token }),
  user: {
    id: "",
    username: "",
    email: "",
  },
  setUser: (user) => set({ user }),
}));
