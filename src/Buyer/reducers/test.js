const Test = (state,action)  =>{
    switch(action.type){
        case "increment":
            return {count:state.count+"+"};
        case "decrement":
            return {count:state.count+"-"};
        default:
           throw new Error(); 
    }
}
export default Test;