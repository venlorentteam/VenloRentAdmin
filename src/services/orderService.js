import api from "./api";

export const getOrders = (query) => api.get(`/orders${query ? `?${query}` : ""}`);

export const getOrder = (id) => api.get(`/orders/${id}`);

export const updateOrder = (id, payload) => api.put(`/orders/${id}`, payload);

export default { getOrders, getOrder, updateOrder };
