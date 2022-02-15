import { createContext, useContext, useReducer } from "react";
import authReducer, { intialState } from "./authReducer";

const AuthContext = createContext();
export const AuthProvider = ({children}) =>{
    const [state, dispatch] = useReducer(authReducer, intialState)
    // Add actions here
    // ex log in and what not

    const value = {
        
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
const useAuth = () =>{
    const context = useContext(AuthContext);
    if (context === undefined){
        console.log("Auth Context not working");
        throw new Error("useAuth must be used within AuthContext");
    }
    return context
}

export default useAuth;