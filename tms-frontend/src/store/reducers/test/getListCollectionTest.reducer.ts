import { createRequest, createSliceReducer } from "@/utils/redux-toolkit";
import { GET_LIST_COLLECTION_TEST } from "../actions";
import { METHOD } from "@/global/enum";

export const queryListCollectionQuiz = createRequest(GET_LIST_COLLECTION_TEST, '/api/v1/collection-quiz', METHOD.GET);
const listCollectionQuiz = createSliceReducer('listCollectionQuiz', queryListCollectionQuiz);
export default listCollectionQuiz.reducer;