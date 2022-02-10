import { configureStore } from "@reduxjs/toolkit";
import { roomsReducer } from "./slices/roomsSlices";

export const store = configureStore({
    reducer:{
        rooms: roomsReducer,
    }
})