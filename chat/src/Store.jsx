import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store); // Export persistor separately

export default store; // Export the store as the default export

// import { configureStore } from "@reduxjs/toolkit";

// import rootReducer from "./Reducers";

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;
