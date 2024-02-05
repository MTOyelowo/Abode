import { createSlice } from '@reduxjs/toolkit';

const tabDisplaySlice = createSlice({
    name: 'tab',
    initialState: { tabShown: true },
    reducers: {
        toggleTabShown: (state) => {
            state.tabShown = !state.tabShown;
        },
    },
});

export const { toggleTabShown } = tabDisplaySlice.actions;

export default tabDisplaySlice.reducer;
