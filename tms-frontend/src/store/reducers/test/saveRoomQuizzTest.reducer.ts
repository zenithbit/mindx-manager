import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { SAVE_ROOM_QUIZZ_TEST } from "../actions";
import { METHOD } from "@/global/enum";
import { createAction } from "@reduxjs/toolkit";

export const querySaveRoomQuizzTest = createRequest(SAVE_ROOM_QUIZZ_TEST, '/api/v1/room-quizz-test', METHOD.POST);
const saveRoomQuizzTest = createSliceReducer('saveRoomQuizzTest', querySaveRoomQuizzTest);
export const clearSaveRoomQuizzTest = createAction<void, string>(`${saveRoomQuizzTest.name}/clear`);

export default saveRoomQuizzTest.reducer;