import { Obj, State } from "@/global/interface";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const useGetCrrUser = () => {
    const crrUser = useSelector((state: RootState) => (state.crrUserInfo as State).state);
    return (crrUser.response as Obj);
}
export default useGetCrrUser;