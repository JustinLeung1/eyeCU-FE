import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../types"



export const intialState = {
    authenticated: false,
    user: {}
}

const authReducer = (state = intialState, action) =>{
    switch (action.type){
        case SET_AUTHENTICATED:
            return{
                ...state,
                authenticated:true
            };
        case SET_UNAUTHENTICATED:
            return intialState;
        case SET_USER:
            return{
                authenicated: true,
                ...action.payload
            };
        default:
            return state;
    }

}

export default authReducer;