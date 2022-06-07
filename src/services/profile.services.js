import service from "./config.services";

const getProfileService = (username) => {
    return service.get(`/user/${username}`);
}

export {
    getProfileService,
}   