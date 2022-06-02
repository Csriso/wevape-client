import { useContext } from 'react'
import { AuthContext } from "../context/auth.context.js"
import { Navigate } from "react-router-dom"
// import { useNavigate } from 'react-router-dom'

export default function IsPrivate(props) {

    const { isLoggedIn } = useContext(AuthContext)
    // const navigate = useNavigate();
    console.log(isLoggedIn)

    if (isLoggedIn === true) {
        return props.children
    } else {
        // navigate("/login")
        return <Navigate to="/login" />
    }
}
