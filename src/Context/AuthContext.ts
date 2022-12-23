import { createContext } from "react";
import { User } from "../types";

type AuthContextStateType = {
  token?: string | undefined;
  user?: User | undefined;
  setAuth: (user: User) => void;
  deleteAuth: () => void;
  getUser: () => User;
};

export const defaultAuthContextState = {
  token: "",
  user: {},
  setAuth: (auth: {}) => {},
  deleteAuth: () => {},
  getUser: () => {},
};

export default createContext<AuthContextStateType | null>(null);
