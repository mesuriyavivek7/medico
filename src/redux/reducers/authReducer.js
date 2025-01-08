import { LOGIN_FETCH_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../types";

const initialState = {
    user: null || JSON.parse(sessionStorage.getItem("user")),
    loading:false,
    error:null
}


const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_FETCH_START:
            return {
                ...state,
                loading:false
            }
        
        case LOGIN_SUCCESS:
            sessionStorage.setItem("user",JSON.stringify(action.payload))
            return {
                user:action.payload,
                loading:false,
                error:null
            }

        case LOGIN_FAILURE:
            sessionStorage.removeItem('user')
            return {
                user:null,
                ...state,
                error:action.payload,   
            }

        case LOGOUT:
            sessionStorage.removeItem("user")
            return {
                user:null,
                loading:false,
                null:null
            }

        default: 
            return state
    }
}

export default authReducer