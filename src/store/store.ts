import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as Redux from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import type { Reducer, Action } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { LOGOUT } from "./action/types";
import { createLogger } from "redux-logger";

import AuthReducer, {
  initialState as AuthInitialState,
} from "../store/reducers/auth.reducer";
import { ReduxSlice } from "../types/enums";

const logger = createLogger();

const middleware: Redux.Middleware[] = [];
if (import.meta.env.MODE === "development") middleware.push(logger);

const persistConfig = {
  key: "root",
  storage,
  whitelist: [ReduxSlice.Auth], // to persist in local storage
};

const combinedReducer = combineReducers({
  [ReduxSlice.Auth]: AuthReducer,
});

const rootReducer: Reducer = (state: RootState, action: Action) => {
  if (action.type === LOGOUT) {
    localStorage.removeItem("persist:root");

    return combinedReducer(
      {
        [ReduxSlice.Auth]: AuthInitialState,
      },
      action,
    );
  } else {
    return combinedReducer(state, action);
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middleware);
  },
  devTools: import.meta.env.MODE === "development",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;

// export const getAccessToken = (state: RootState): string | null => {
//   if (state.auth.token) return state.auth.token;
//   return null;
// };
//
