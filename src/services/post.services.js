import service from "./config.services";

const getAllPostsService = () => {
    return service.get("/post")
}

const newPostService = (data) => {
    return service.post("/post", data);
}

const manageLikeService = (id, user) => {
    return service.patch(`/post/${id}/manageLikes`, user);
}

// const verifyService = () => {
//     return service.get("/auth/verify");
// }

export {
    getAllPostsService,
    newPostService,
    manageLikeService,
    // loginService,
    // verifyService
}