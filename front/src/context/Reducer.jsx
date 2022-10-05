import React from "react"
import types from "./types"

const Reducer = (state={},action)=>{
    switch(action.type){
        case types.login:
            return{
                state:true
            }
        case types.logout:
            return{
                state:false
            }
        default:
            return state
    }
}

export default Reducer;