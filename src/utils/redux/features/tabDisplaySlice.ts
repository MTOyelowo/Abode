import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const tabDisplaySlice = createSlice({
    name: 'tab',
    initialState: { tabShown: true },
    reducers: {
        setTabShown: (state, action: PayloadAction<boolean>) => {
            state.tabShown = action.payload;
        },

        toggleTabShown: (state) => {
            state.tabShown = !state.tabShown;
        },
    },
});

export const { setTabShown, toggleTabShown } = tabDisplaySlice.actions;

export default tabDisplaySlice.reducer;
