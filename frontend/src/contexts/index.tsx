import { createContext } from "react";

interface AuthContext {
    user: string,
    logIn: () => void,
    logOut: () => void
    loggedIn: any
}

const AuthContext = createContext({} as AuthContext);

export default AuthContext;
