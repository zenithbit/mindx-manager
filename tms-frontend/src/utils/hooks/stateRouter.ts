import { Obj, State } from "@/global/interface";
import { RootState } from "@/store";
import { StateRoute } from "@/store/reducers/global-reducer/route";
import { useSelector } from "react-redux";

const useGetStateRouter = () => {
    const stateRouter = useSelector((state: RootState) => (state.getDataRoute as State).state);
    return (stateRouter.response as Obj)?.payload as StateRoute;
};
export default useGetStateRouter;