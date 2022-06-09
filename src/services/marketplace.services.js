import service from "./config.services";

const getAdsService = () => {
    return service.get(`/ad`);
}
const getOneAdsService = (id) => {
    return service.get(`/ad/${id}`);
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
const manageLikeAdService = (id, user) => {
    return service.patch(`/ad/${id}/manageLikes`, user);
}

const createNewAdComment = (idAd, comment) => {
    return service.post(`/comment/${idAd}/ad`, comment);
}


// const createNewCommentOfComment = (idComment, comment) => {
//     return service.post(`/comment/of/comment/${idComment}`, comment);
// }
// const manageCommentLikeService = (id, user) => {
//     return service.patch(`/comment/${id}/manageLikes`, user);
// }


export {
    getAdsService,
    createNewAdService,
    editAdService,
    removeAdService,
    getOneAdsService,
    manageLikeAdService,
    createNewAdComment
}   