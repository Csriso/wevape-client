import { createContext, useState, useEffect } from "react"
import { SyncLoader } from "react-spinners"
import { verifyService } from "../services/auth.services"

const AuthContext = createContext()

function AuthWrapper(props) {

    // todos los estados y funciones
    const [isLoggedIn, setIsLoggedIn] = useState(null)
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

    if (isLoggedIn === null) {
        return (
            <div className="App h-screen">
                <div class="flex flex-col align-items-center justify-center h-screen">
                    <img src="/logo.png" width={200} alt="" className="self-center mb-5" />
                    <SyncLoader color={"#ffffff"} />
                </div>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthWrapper }


