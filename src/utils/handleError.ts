import axios from "axios";

import { IErrorRes } from "../../types/error";

export const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.response) return alert((error.response.data as IErrorRes).detail);

        return alert(error.message);
    }
}