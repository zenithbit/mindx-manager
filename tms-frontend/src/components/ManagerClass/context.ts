import { createContext } from "react";
import { ContextInterface } from "../Tabs/ToolBar/interface";

const ManagerClassContext = createContext<ContextInterface>({
    crrKeyTab: '',
    listFieldFilter: [],
    setContext(data) { }
});
export default ManagerClassContext;