import axios from "axios";

import { endpoints } from "../constants";
import { IUser } from "../types/user";
import { handleError } from "../src/utils/handleError";

type IDataRes = { data: IUser };

export const registerUser = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
        const { data }: IDataRes = await axios.post(endpoints.register, {
            email,
            password,
            firstName,
            lastName,
        })

        if (data) return data;
        return null;
    } catch (error) {
        handleError(error);
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const { data }: IDataRes = await axios.post(endpoints.login, {
            email,
            password,
        })

        if (data) return data;
        return null;

    } catch (error) {
        handleError(error)
    }
}

