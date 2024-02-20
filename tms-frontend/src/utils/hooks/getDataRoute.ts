import { State } from "@/global/interface";
import { RootState } from "@/store";
import { PayloadRoute } from "@/store/reducers/global-reducer/route";
import { useSelector } from "react-redux";

const useGetDataRoute = () => {
    const storeRoute = useSelector((state: RootState) => (state.getDataRoute as State).state);
    return ((storeRoute.response as unknown as PayloadRoute)?.payload);
}
export default useGetDataRoute;