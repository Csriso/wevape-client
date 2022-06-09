import { createContext, useState, useEffect } from "react"
import { SyncLoader } from "react-spinners"
import { verifyService } from "../services/auth.services"
import { getProfileByIdService } from "../services/profile.services"

const AuthContext = createContext()

function AuthWrapper(props) {

    // todos los estados y funciones
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [user, setUser] = useState(null)
    const [completeUser, setCompleteUser] = useState(null)


    const authenticateUser = async () => {
        try {
            const response = await verifyService()
            const completeUserReq = await getProfileByIdService(response.data.id);
            setIsLoggedIn(true)
            setUser(response.data);
            setCompleteUser(completeUserReq.data);
        } catch (error) {
            setIsLoggedIn(false);
            setCompleteUser(null);
            setUser(null);
        }
    }

    const passedContext = {
        isLoggedIn,
        user,
        authenticateUser,
        completeUser
    }

    useEffect(() => {
        authenticateUser();
    }, [])

    if (isLoggedIn === null) {
        return (
            <div className="App h-screen">
                <div className="flex flex-col align-items-center justify-center h-screen">
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


