import service from "./config.services";

const getProfileService = (username) => {
    return service.get(`/user/${username}`);
}
const getProfileByIdService = (id) => {
    return service.get(`/user/${id}/id`);
}

const followProfileService = (username, user) => {
    return service.patch(`/user/${username}/follow`, user);
}

const avatarUpdate = (userid, imageUrl) => {
    return service.patch(`/user/${userid}/image`, imageUrl);
}

const profileUpdateService = (id, body) => {
    return service.patch(`/user/${id}/edit`, body);
}

export {
    getProfileService,
    followProfileService,
    avatarUpdate,
    profileUpdateService,
    getProfileByIdService
}   