import service from "./config.services";

const getProfileService = (username) => {
    return service.get(`/user/${username}`);
}

const followProfileService = (username, user) => {
    return service.patch(`/user/${username}/follow`, user);
}

export {
    getProfileService,
    followProfileService
}   