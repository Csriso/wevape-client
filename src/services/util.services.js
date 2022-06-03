import service from "./config.services";


const uploadImage = (file) => {
    return service.post("/upload", file);
}

export {
    uploadImage
}