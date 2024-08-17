import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers'; // Adjust the path as necessary

// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers here if needed
  },
  // Add middleware if needed (e.g., Redux Thunk for async actions)
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;
