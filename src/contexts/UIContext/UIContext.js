import { createContext, useContext, useReducer } from "react";
import uiReducer, {intialState} from "./uiReducer";

const UIContext = createContext();
export const UIProvider = ({children}) =>{
    const [state, dispatch] = useReducer(uiReducer, intialState)
    // Add actions here
    // ex log in and what not

    const value = {
        
    }
    return <UIContext.Provider value={value}>{children}</UIContext.Provider>
};
const useUI = () =>{
    const context = useContext(UIContext);
    if (context === undefined){
        console.log("UI Context not working");
        throw new Error("useUI must be used within UIContext");
    }
    return context
}

export default useUI;