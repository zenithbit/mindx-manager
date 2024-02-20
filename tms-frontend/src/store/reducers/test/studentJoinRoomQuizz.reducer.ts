import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { STUDENT_JOIN_ROOM_QUIZZ_TEST } from "../actions";
import { createAction } from "@reduxjs/toolkit";

export const queryStudentJoinRoomQuizz = createRequest(STUDENT_JOIN_ROOM_QUIZZ_TEST, '/api/v1/room-quizz-test/student', METHOD.POST);
const studentJoinRoomQuizz = createSliceReducer('studentJoinRoomQuizz', queryStudentJoinRoomQuizz);
export const clearStudentJoin = createAction<void, string>(`${studentJoinRoomQuizz.name}/clear`);
export default studentJoinRoomQuizz.reducer;