import service from "./config.services";

const getAllPostsService = () => {
    return service.get("/post")
}

const newPostService = (data) => {
    return service.post("/post", data);
}

// const loginService = (user) => {
//     return service.post("/auth/login", user);
// }

// const verifyService = () => {
//     return service.get("/auth/verify");
// }

export {
    getAllPostsService,
    newPostService,
    // loginService,
    // verifyService
}