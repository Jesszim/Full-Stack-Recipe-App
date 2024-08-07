import { legacy_createStore as createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer)

store.subscribe(()=>{
    console.log(store.getState())
})

export default store