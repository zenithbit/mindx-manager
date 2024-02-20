import { useDispatch } from "react-redux";
import { clearMessage, openMessage } from "@/store/reducers/global-reducer/message";

const useHookMessage = () => {
    const dispatch = useDispatch();
    const objectMessage = {
        open: (payload: {
            content: string;
            type: 'success' | 'error' | 'warning'
        }, msPendingClose?: number) => {
            dispatch(openMessage({
                content: payload.content,
                type: payload.type as 'success' | 'error' | 'warning'
            }))
            setTimeout(() => {
                dispatch(clearMessage());
            }, msPendingClose || 2500)
        },
        close: (msPendingClose?: number, callBack?: () => void) => {
            setTimeout(() => {
                dispatch(clearMessage());
                callBack?.();
            }, msPendingClose || 2500)
        }
    }
    return objectMessage;
};
export {
    useHookMessage
}