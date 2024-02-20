import { Action } from "./interface";

const initState: {
    state: Action
} = {
    state: {
        isLoading: false,
        response: null
    }
};
const LOGO = 'https://res.cloudinary.com/dxo374ch8/image/upload/v1704960205/yvagjcpybdmjn1y9mvro.jpg';
export {
    initState,
    LOGO
}