import { createContext } from "react";

import { IUser } from "./types/user";

export const AuthContext = createContext<{
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}>({
    user: null,
    setUser: (user: IUser | null) => { }
})