import service from "./config.services";

const getAllGroupsService = () => {
    return service.get("/group")
}
const getGroupService = (id) => {
    return service.get(`/group/${id}`);
}
const newGroupService = (data) => {
    return service.post("/group", data);
}
const joinGroupService = (id, data) => {
    return service.post(`/group/${id}/join`, data);
}
const getAllUserGroups = (userId) => {
    return service.get(`/group/my`, userId);
}


export {
    getAllGroupsService,
    getGroupService,
    newGroupService,
    joinGroupService,
    getAllUserGroups
}