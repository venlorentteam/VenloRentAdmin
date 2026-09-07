import { useEffect, useState } from "react";

const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  totalItems: 0,
  totalPages: 0,
};

const usePaginatedResource = ({ fetchPage, initialLimit = 10, deps = [] }) => {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({
    ...DEFAULT_PAGINATION,
    limit: initialLimit,
  });
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPage = async (page = 1, limit = pagination.limit) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchPage({ page, limit });
      const data = res.data || {};
      const nextItems = data.items || data.orders || [];
      const nextPagination = data.pagination || {};

      setItems(nextItems);
      setSummary(data.summary || {});
      setPagination({
        page: nextPagination.page || page,
        limit: nextPagination.limit || limit,
        totalItems: nextPagination.totalItems ?? nextItems.length,
        totalPages: nextPagination.totalPages ?? Math.max(Math.ceil((nextPagination.totalItems ?? nextItems.length) / limit), 1),
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to fetch data");
      setItems([]);
      setSummary({});
      setPagination({
        ...DEFAULT_PAGINATION,
        limit,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage(1, initialLimit);
    // Re-fetch when external filters/search terms change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const goToPage = (page) => loadPage(page, pagination.limit);
  const setLimit = (limit) => loadPage(1, limit);
  const reload = () => loadPage(pagination.page, pagination.limit);

  return {
    items,
    pagination,
    summary,
    loading,
    error,
    setItems,
    goToPage,
    setLimit,
    reload,
  };
};

export default usePaginatedResource;
