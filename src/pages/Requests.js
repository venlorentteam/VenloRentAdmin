import { useState } from "react";

import "./Requests.css";

import AdminLayout from "../components/layout/AdminLayout";

import DataTable from "../components/common/DataTable";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import StatusBadge from "../components/common/StatusBadge";
import Drawer from "../components/common/Drawer";
import Loader from "../components/layout/Loader";
import PaginationControls from "../components/common/PaginationControls";

import usePaginatedResource from "../hooks/usePaginatedResource";
import { getAdminRequests } from "../services/requestService";

const REQUEST_FILTERS = ["All", "Open", "Matched", "Closed", "Expired"];

const Requests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Fetch logic using the admin request service
  const fetchRequests = ({ page, limit }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Missing admin token. Please log in again.");
    }

    return getAdminRequests(token, {
      page,
      limit,
      search: searchTerm,
      status: activeFilter,
    });
  };

  // Using the hook to manage pagination, loading, and data
  const {
    items: requests,
    pagination,
    summary,
    loading,
    error,
    goToPage,
    setLimit,
  } = usePaginatedResource({
    fetchPage: fetchRequests,
    initialLimit: 10,
    deps: [searchTerm, activeFilter],
  });

  const totalRequests = summary.totalRequests ?? pagination.totalItems ?? requests.length;
  const openRequests = summary.openRequests ?? 0;
  const matchedRequests = summary.matchedRequests ?? 0;
  const closedRequests = summary.closedRequests ?? 0;

  const columns = [
    { key: "id", label: "Request ID" },
    { key: "user", label: "User" },
    { key: "location", label: "Location" },
    { key: "budget", label: "Budget" },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
    { key: "createdAt", label: "Created" },
  ];

  return (
    <AdminLayout>
      <div className="requests-page">
        {loading && <Loader />}

        <div className="requests-stats-grid">
          <div className="requests-stat-card">
            <div className="requests-stat-label">Total Requests</div>
            <div className="requests-stat-value">{totalRequests}</div>
          </div>
          <div className="requests-stat-card">
            <div className="requests-stat-label">Open</div>
            <div className="requests-stat-value">{openRequests}</div>
          </div>
          <div className="requests-stat-card">
            <div className="requests-stat-label">Matched</div>
            <div className="requests-stat-value">{matchedRequests}</div>
          </div>
          <div className="requests-stat-card">
            <div className="requests-stat-label">Closed</div>
            <div className="requests-stat-value">{closedRequests}</div>
          </div>
        </div>

        <div className="requests-toolbar">
          <SearchBar
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterBar
            filters={REQUEST_FILTERS}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <DataTable
          columns={columns}
          data={requests}
          renderActions={(row) => (
            <button className="request-view-btn" onClick={() => setSelectedRequest(row)}>
              View
            </button>
          )}
        />

        {!loading && requests.length === 0 && <div className="empty-message">No requests found.</div>}

        <PaginationControls
          pagination={pagination}
          onPageChange={goToPage}
          onLimitChange={setLimit}
        />

        <Drawer
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          title="Request Details"
        >
          {selectedRequest && (
            <div className="request-detail-grid">
              <div className="request-detail-item"><strong>ID</strong><span>{selectedRequest.id}</span></div>
              <div className="request-detail-item"><strong>User</strong><span>{selectedRequest.user}</span></div>
              <div className="request-detail-item"><strong>Location</strong><span>{selectedRequest.location}</span></div>
              <div className="request-detail-item"><strong>Budget</strong><span>{selectedRequest.budget}</span></div>
              <div className="request-detail-item"><strong>Status</strong><StatusBadge status={selectedRequest.status} /></div>
              <div className="request-detail-item"><strong>Created</strong><span>{selectedRequest.createdAt}</span></div>
            </div>
          )}
        </Drawer>
      </div>
    </AdminLayout>
  );
};

export default Requests;