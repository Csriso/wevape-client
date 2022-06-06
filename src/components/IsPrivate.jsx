import { useContext } from 'react'
import { AuthContext } from "../context/auth.context.js"
import { Navigate } from "react-router-dom"
import { useNavigate } from 'react-router-dom'

export default function IsPrivate(props) {

    const { isLoggedIn } = useContext(AuthContext)

    if (isLoggedIn === true) {
        return props.children
    } else {
        return <Navigate to="/login" />
    }
}
