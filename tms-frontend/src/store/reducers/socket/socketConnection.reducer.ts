import { createAction } from "@reduxjs/toolkit";
import { io } from 'socket.io-client';
import { Obj } from "@/global/interface";
import { RoomSocket } from "@/global/enum";
import { createSliceReducer } from "@/utils/redux-toolkit";

export interface UserOnline {
    userName: string;
    role: string;
    position?: string;
    img?: string;
    id: string;
    isDisconnect?: boolean;
    // side server
    socketId?: string;
}
const createSocket = () => {
    const socket = io(process.env.NEXT_PUBLIC_SERVER_API as string);
    return socket;
}
export const queryReceiveConnection = (callBack?: Function) => {
    const socket = createSocket();
    socket.on(RoomSocket.COMMON, (data) => {
        callBack?.(data);
    });
};

const emitRoom = (data: Obj) => {
    const socket = createSocket();
    socket.emit(RoomSocket.COMMON, data);
}
const socketConnection = createSliceReducer('socketConnection', undefined, {
    emit(_, action) {
        emitRoom(action!.payload);
    },
    getData(state, action) {
        state.state = {
            ...state.state,
            response: action!.payload,
            success: true
        }
    },
});

export const queryEmitSocket = createAction<UserOnline, string>(`${socketConnection.name}/emit`);
export const onReceivedData = createAction<UserOnline, string>(`${socketConnection.name}/getData`);
export default socketConnection.reducer;
