import service from "./config.services";

const createNewComment = (idPost, comment) => {
    return service.post(`/comment/${idPost}`, comment);
}
const getComment = (idComment) => {
    return service.get(`/comment/${idComment}`);
}

export {
    createNewComment,
    getComment,
}   