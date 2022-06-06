import service from "./config.services";

const createNewComment = (idPost, comment) => {
    return service.post(`/comment/${idPost}`, comment);
}

export {
    createNewComment,
}