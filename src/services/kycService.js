import api from "./api";

export const getApplications = (query) => api.get(`/kyc${query ? `?${query}` : ""}`);

export const getApplication = (id) => api.get(`/kyc/${id}`);

export const updateApplicationStatus = (id, payload) => api.put(`/kyc/${id}`, payload);

export default { getApplications, getApplication, updateApplicationStatus };
