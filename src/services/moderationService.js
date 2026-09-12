import api from "./api";

/**
 * Fetches the unified moderation queue containing both 
 * user reports and flagged properties.
 */
export const getModerationQueue = (token, params = {}) => {
  const query = new URLSearchParams();

  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.search) query.set("search", String(params.search).trim());
  if (params.status && params.status !== "All") query.set("status", params.status);
  if (params.type && params.type !== "All") query.set("type", params.type);

  const suffix = query.toString() ? `?${query.toString()}` : "";

  return api.get(`/admin/moderation${suffix}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/**
 * Performs an action on a moderation item.
 * @param {string} type - 'report' or 'property'
 * @param {string} id - The database ID of the item or report
 * @param {string} action - 'approve', 'reject', 'dismiss', or 'resolve'
 */
export const performModerationAction = (token, type, id, action, payload = {}) =>
  api.patch(`/admin/moderation/${type}/${id}`, { action, ...payload }, {
    headers: { Authorization: `Bearer ${token}` },
  });

//export default { getModerationQueue, performModerationAction };

