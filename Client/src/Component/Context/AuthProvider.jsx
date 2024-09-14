import { createContext, useState, useContext } from "react";
import cookies from "js-cookie";

// default value for the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //  initial user state from cookies or local storage
  const initialUserState = cookies.get("jwt") || localStorage.getItem("chat");

  const [authuser, setAuthUser] = useState(
    initialUserState ? JSON.parse(initialUserState) : undefined
  );
  return (
    <AuthContext.Provider value={[authuser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

//  use the authentication context
export const UseAuth = () => useContext(AuthContext, AuthProvider);
