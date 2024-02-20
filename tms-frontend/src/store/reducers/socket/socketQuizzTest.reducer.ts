import { createAction } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import { Obj } from '@/global/interface';
import { createSliceReducer } from '@/utils/redux-toolkit';

export interface RoomTest extends Obj{
    codeClass: string;
    start: boolean;
    finish: boolean;
    join: boolean;
    listStudent?: Obj[];
    student?: Obj;
    time?: number;
    duringInTheTest: boolean;
}
export interface QuizzTest {
    room: string;
    data: RoomTest;
}
const createSocket = (room: string) => {
    if (room) {
        const socket = io(`${process.env.NEXT_PUBLIC_SERVER_API as string}${process.env.NEXT_PUBLIC_QUIZZ_TEST}`, {
            query: {
                room
            }
        });
        return socket;
    }
    return null;
}
export const receivedDataFromRoomQuizz = (room: string, callback: Function) => {
    const socket = createSocket(room);
    if (socket) {
        socket.on(room, (data) => {
            callback(data);
        });
    }
}
const emitRoom = (payload: QuizzTest) => {
    const socket = createSocket(payload.room);
    if (socket) {
        socket.emit(payload.room, payload.data);
    }
}
const quizzTestSocket = createSliceReducer('quizzTestSocket', undefined, {
    emit(_, action) {
        emitRoom(action?.payload as QuizzTest);
    },
    getData(state, action) {
        state.state = {
            ...state.state,
            response: action!.payload,
            success: !!action!.payload.join
        }
    },
});
export const emitRoomQuizzTestSocket = createAction<QuizzTest, string>(`${quizzTestSocket.name}/emit`);
export const getDataFromRoomQuizzSocket = createAction<Obj, string>(`${quizzTestSocket.name}/getData`);

export default quizzTestSocket.reducer;