// lugar donde esta configurado el service
import axios from "axios";
console.log(process.env);
const service = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})

// es donde hacemos codigo magia donde el token será enviado al backend
service.interceptors.request.use((config) => {

    // buscar el token en localStorage
    const authToken = localStorage.getItem("authToken")

    if (authToken) {
        config.headers = { authorization: `Bearer ${authToken}` }
    }

    return config

})

export default service