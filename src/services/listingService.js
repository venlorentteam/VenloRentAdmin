import api from "./api";

export const getListings = (query) => api.get(`/listings${query ? `?${query}` : ""}`);

export const getListing = (id) => api.get(`/listings/${id}`);

export const createListing = (payload) => api.post(`/listings`, payload);

export const updateListing = (id, payload) => api.put(`/listings/${id}`, payload);

export const deleteListing = (id) => api.delete(`/listings/${id}`);

// export default { getListings, getListing, createListing, updateListing, deleteListing };
