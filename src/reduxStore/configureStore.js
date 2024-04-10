import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureReduxStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureReduxStore;
