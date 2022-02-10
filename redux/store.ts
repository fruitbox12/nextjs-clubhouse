import { combineReducers, configureStore, Store } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { roomsReducer } from "./slices/roomsSlices";

const rootReducer = combineReducers({
    rooms: roomsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (): Store<RootState> => configureStore({reducer: rootReducer})

export const wrapper = createWrapper(makeStore,{debug: true})