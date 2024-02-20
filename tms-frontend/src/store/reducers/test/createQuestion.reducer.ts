import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { CREATE_QUESTION_QUIZ } from "../actions";

export const queryCreateQuestion = createRequest(CREATE_QUESTION_QUIZ, '/api/v1/question', METHOD.POST);
const createQuestion = createSliceReducer('createQuestion', queryCreateQuestion);
export const clearCreateQuestion = createAction<void, string>(`${createQuestion.name}/clear`);
export default createQuestion.reducer;