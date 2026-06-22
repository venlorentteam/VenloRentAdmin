import api from "./api";

export const getApplications = (token) => api.get(`/admin/kyc`, { headers: { Authorization: `Bearer ${token}` } });

export const getApplication = (id) => api.get(`/admin/kyc/${id}`);

export const updateApplicationStatus = (id, payload) => api.put(`/adminkyc/${id}`, payload);

export default { getApplications, getApplication, updateApplicationStatus };
