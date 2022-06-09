import service from "./config.services";

const getAdsService = () => {
    return service.get(`/ad`);
}
const createNewAdService = (ad) => {
    return service.post(`/ad`, ad);
}
const editAdService = (ad) => {
    return service.patch(`/ad`, ad);
}
const removeAdService = (id, user) => {
    return service.delete(`/${id}`, user);
}


const createNewCommentOfComment = (idComment, comment) => {
    return service.post(`/comment/of/comment/${idComment}`, comment);
}
const manageCommentLikeService = (id, user) => {
    return service.patch(`/comment/${id}/manageLikes`, user);
}


export {
    getAdsService,
    createNewAdService,
    editAdService,
    removeAdService,
    createNewCommentOfComment,
    manageCommentLikeService,
}   