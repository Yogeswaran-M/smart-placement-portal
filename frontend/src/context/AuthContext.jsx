import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    //token is there true otherwise false
    const[isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );
return(
    <AuthContext.Provider
    value={{
        isLoggedIn,
        setIsLoggedIn
    }}
    >
        {children}
    </AuthContext.Provider>
);
};

export default AuthProvider;