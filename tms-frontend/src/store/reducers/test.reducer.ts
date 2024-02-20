import { PayloadAction, createAction } from '@reduxjs/toolkit';
import { Obj, State } from '@/global/interface';
import { METHOD } from '@/global/enum';
import { createSliceReducer, createRequest } from '@/utils/redux-toolkit';
import { TEST_CALL_API } from './actions';

export const testCall = createRequest(TEST_CALL_API, '/api/v1/class/$params', METHOD.GET);
const test = createSliceReducer('test', testCall, {
    incr: (state: State, action?: PayloadAction<Obj>) => {
        console.log(state.state);
    }
});

export const incr = createAction<void, string>(`${test.name}/incr`);
export default test.reducer;