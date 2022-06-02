import { useContext} from 'react'
import { AuthContext } from "../context/auth.context.js"
import { Navigate } from "react-router-dom"
// Navigate es un COMPONENTE que funciona similar a navigate de useNavigate

// un HOC => Higher Order Component
function IsPrivate(props) {

  const { isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn === true) {
    return props.children
  } else {
    return <Navigate to="/login"/>
  }
}

export default IsPrivate