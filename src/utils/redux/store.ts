// store.js
import { configureStore } from '@reduxjs/toolkit';
import tabReducer from './features/tabDisplaySlice';

const store = configureStore({
    reducer: {
        tab: tabReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
