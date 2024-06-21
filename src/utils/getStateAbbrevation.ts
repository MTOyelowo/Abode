import { states } from "../constants/USStates";

export const getStateAbbrevation = (state: any) => {
    const stateAbrev = states[state as "Florida"];

    if (stateAbrev) return stateAbrev;
    return state;
}