import { createContext } from "react";

interface AuthContext {
    user: { token: string, username: string },
    logIn: () => void,
    logOut: () => void
    loggedIn: any
}

const AuthContext = createContext({} as AuthContext);

export default AuthContext;
