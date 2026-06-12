import api from "./api";

export const getUsers = (query) => api.get(`/users${query ? `?${query}` : ""}`);

export const getUser = (id) => api.get(`/users/${id}`);

export const updateUser = (id, payload) => api.put(`/users/${id}`, payload);

export default { getUsers, getUser, updateUser };
