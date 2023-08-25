import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit"
import { gamesAPI } from "../services/GamesServices"


const rootReducer = combineReducers({
  [gamesAPI.reducerPath]: gamesAPI.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(gamesAPI.middleware))
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

