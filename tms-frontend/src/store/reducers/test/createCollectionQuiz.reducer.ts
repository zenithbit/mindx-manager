import { createAction } from "@reduxjs/toolkit";
import { METHOD } from "@/global/enum";
import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { CREATE_COLLECTION_TEST } from "../actions";

export const queryCreateCollectionQuiz = createRequest(CREATE_COLLECTION_TEST, '/api/v1/collection-quiz', METHOD.POST);
const createCollectionQuiz = createSliceReducer('createCollectionQuiz', queryCreateCollectionQuiz);
export const clearCreateCollectionQuiz = createAction<void, string>(`${createCollectionQuiz.name}/clear`);
export default createCollectionQuiz.reducer;