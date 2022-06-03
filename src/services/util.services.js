import service from "./config.services";


const uploadImage = (imageUrl) => {
    return service.post("/upload", imageUrl);
}

export {
    uploadImage
}