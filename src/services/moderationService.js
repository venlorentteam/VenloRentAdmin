import api from "./api";

export const getFlaggedItems = (query) => api.get(`/moderation${query ? `?${query}` : ""}`);

export const resolveItem = (id, payload) => api.put(`/moderation/${id}`, payload);

export default { getFlaggedItems, resolveItem };
