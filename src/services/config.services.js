// lugar donde esta configurado el service
import axios from "axios";

const service = axios.create({
    baseURL: process.env.BACKEND_URL || "http://localhost:5005/api"
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