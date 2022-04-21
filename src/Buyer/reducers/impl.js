import { useReducer } from "react"
import Test from "./test"


const Impl=()=>{
    const[state,dispatch] = useReducer(Test,{count:"Plus"});

    return(
        <>
        Count : {state.count}
        <button onClick={()=>dispatch({type:"increment"})}>+</button>
        <button onClick={()=>dispatch({type:"decrement"})}>-</button>
        </>
    )
}

export default Impl;