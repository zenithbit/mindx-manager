import { useDispatch } from "react-redux";
import { clearToken } from "@/store/reducers/auth-get-token.reducer";
import { logout } from "@/store/reducers/user-info.reducer";

const useLogout = () => {
    const dispatch = useDispatch();
    return () => {
        dispatch(clearToken());
        dispatch(logout());
        localStorage.removeItem('access_token');
    }
};
export default useLogout;