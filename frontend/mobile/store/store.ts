import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { clearAuthSession, saveAuthSession } from '../services/authStorage';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // Other reducers will be added here
        // cart: cartReducer,
        // order: orderReducer,
        // analytics: analyticsReducer,
    },
    // Adding middleware is easy here if needed
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Sometimes helpful for React Native
        }),
});

let previousAuthState = store.getState().auth;

store.subscribe(() => {
    const authState = store.getState().auth;

    if (authState.isAuthenticated && authState.token && authState.user) {
        void saveAuthSession({
            user: authState.user,
            token: authState.token,
        });
    } else if (previousAuthState.isAuthenticated && !authState.isAuthenticated) {
        void clearAuthSession();
    }

    previousAuthState = authState;
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
