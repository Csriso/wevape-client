import service from "./config.services";

const createNewComment = (idPost, comment) => {
    return service.post(`/comment/${idPost}`, comment);
}
const getComment = (idComment) => {
    return service.get(`/comment/${idComment}`);
}
const createNewCommentOfComment = (idComment, comment) => {
    return service.post(`/comment/${idComment}/comment`, comment);
}
const manageCommentLikeService = (id, user) => {
    return service.patch(`/comment/${id}/manageLikes`, user);
}
export {
    createNewComment,
    getComment,
    createNewCommentOfComment,
    manageCommentLikeService
}   