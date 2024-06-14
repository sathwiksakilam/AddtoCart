import {combineReducers} from "redux"
import { cartReducer } from "./reducer"


const rootReducer = combineReducers({
    cartReducer:cartReducer
})

export default rootReducer