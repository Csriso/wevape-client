import service from "./config.services";

const getAllPostsService = () => {
    return service.get("/post")
}

const getPostService = (id) => {
    return service.get(`/post/${id}`);
}

const newPostService = (data) => {
    return service.post("/post", data);
}

const manageLikeService = (id, user) => {
    return service.patch(`/post/${id}/manageLikes`, user);
}

const getUsernamePostsService = (username) => {
    return service.get(`/post/${username}/user`);
}


export {
    getAllPostsService,
    getPostService,
    newPostService,
    manageLikeService,
    getUsernamePostsService,
}