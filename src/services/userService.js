import api from "./api";

export const getUsers = (token) => api.get(`/admin/users`, { headers: { Authorization: `Bearer ${token}` } });

export const getUser = (id) => api.get(`/admin/users/${id}`);

export const updateUserStatus = (id, status) =>
  api.patch(`/admin/users/${id}/status`, { status });

export default { getUsers, getUser, updateUserStatus };
