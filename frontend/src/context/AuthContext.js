import { Children, use, useContext, useEffect, useState } from "react";
import { createContext } from "react";

const AuthContext= createContext();

export const useAuthContext=()=>{
    return useContext(AuthContext);
}


export const AuthContextProvider = ({children}) => {
    const [reset,setReset]=useState(true);
  return (
    <AuthContext.Provider value={{reset,setReset}}>
        {children}
    </AuthContext.Provider>
  )
}
