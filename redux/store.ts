import { combineReducers, configureStore, Store } from "@reduxjs/toolkit";
import { roomsReducer } from "./slices/roomsSlices";

const rootReducer = combineReducers({
    rooms: roomsReducer
})

export const makeStore = (): Store => configureStore({reducer: rootReducer})