import { combineReducers, configureStore, Store } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { roomsReducer } from "./slices/roomsSlices";
import { userSlice } from "./slices/userSlice";
import { RootState } from "./types";

export const rootReducer = combineReducers({
    rooms: roomsReducer,
    user: userSlice,
})



export const makeStore = (): Store<RootState> => configureStore({reducer: rootReducer})

export const wrapper = createWrapper(makeStore,{debug: true})