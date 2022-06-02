import { createContext, useState, useEffect } from "react"
import { verifyService } from "../services/auth.services"

const AuthContext = createContext()

function AuthWrapper(props) {

    // todos los estados y funciones
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    const authenticateUser = async () => {
        try {
            // donde llamaremos a esa ruta verify
            const response = await verifyService()
            console.log("Token valido")
            console.log("el payload es:", response.data)
            setIsLoggedIn(true)
            setUser(response.data);

        } catch (error) {
            setIsLoggedIn(false);
            setUser(null);
            console.log("El usuario no tiene token o el token no es valido")
        }
    }

    const passedContext = {
        isLoggedIn,
        user,
        authenticateUser
    }

    useEffect(() => {
        authenticateUser();
    }, [])


    return (
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthWrapper }


