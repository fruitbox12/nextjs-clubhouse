import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room, RoomApi, RoomType } from "../../api/RoomApi";
import { Axios } from "../../core/axios";

type RoomsSliceState = {
    items: Room[]
}

const initialState: RoomsSliceState = {
    items:[]
}

export const fetchCreateRooms = createAsyncThunk<Room,{title: string; type: RoomType}>(
    'rooms/fetchCreateRoomsStatus',
    async({title, type}: {title: string, type: RoomType})=>{
        try {
            const room = await RoomApi(Axios).createRoom({
                title,
                type
            })
            return room
        } catch (error) {
            throw Error('Error')
        }
    }
)

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers:{
        setRooms: (state, action: PayloadAction<Room[]>)=>{
            state.items = action.payload
        },
    },
    extraReducers:{
        [fetchCreateRooms.fulfilled.type]: (state, action: PayloadAction<Room>)=>{
            state.items.push(action.payload)
        },
        [fetchCreateRooms.rejected.type]: ()=>{
            console.log();
        }
    }
})

export const {setRooms} = roomsSlice.actions
export const roomsReducer = roomsSlice.reducer