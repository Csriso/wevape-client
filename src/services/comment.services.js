import service from "./config.services";

const getComment = (idComment) => {
    return service.get(`/comment/${idComment}`);
}
const createNewComment = (idPost, comment) => {
    return service.post(`/comment/${idPost}`, comment);
}
const createNewCommentOfComment = (idComment, comment) => {
    return service.post(`/comment/of/comment/${idComment}`, comment);
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