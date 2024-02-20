import { createContext } from "react"
import { ContextInterface } from "./interface"

const createContextToolBar = () => {
    return createContext<ContextInterface>({
        crrKeyTab: '',
        listFieldFilter: [],
        setContext(data) { }
    })
}
export {
    createContextToolBar
}