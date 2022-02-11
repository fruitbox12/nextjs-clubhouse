import {  RoomsSliceState } from "./slices/roomsSlices";
import { UserSliceState } from "./slices/userSlice";

export type RootState = {
    user: UserSliceState,
    rooms: RoomsSliceState
}