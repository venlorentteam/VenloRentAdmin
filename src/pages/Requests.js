import { useState, useMemo } from "react";

import "./Requests.css";

import AdminLayout from "../components/layout/AdminLayout";

import DataTable from "../components/common/DataTable";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import StatusBadge from "../components/common/StatusBadge";
import Drawer from "../components/common/Drawer";

import { requests } from "../mockData";

const Requests = () => {

  const [selectedRequest, setSelectedRequest] =
    useState(null);

  const [searchTerm, setSearchTerm] =
  useState("");

const [activeFilter, setActiveFilter] =
  useState("All");

const filteredRequests = useMemo(() => {

  return requests.filter(request => {

    const matchesSearch =

      request.id
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||

      request.user
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||

      request.location
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesFilter =

      activeFilter === "All"
        ? true
        : request.status === activeFilter;

    return (
      matchesSearch &&
      matchesFilter
    );

  });

}, [
  searchTerm,
  activeFilter
]);

  const columns = [
    {
      key: "id",
      label: "Request ID",
    },

    {
      key: "user",
      label: "User",
    },

    {
      key: "location",
      label: "Location",
    },

    {
      key: "budget",
      label: "Budget",
    },

    {
      key: "bedrooms",
      label: "Bedrooms",
    },

    {
      key: "status",
      label: "Status",

      render: (row) => (
        <StatusBadge
          status={row.status}
        />
      ),
    },

    {
      key: "createdAt",
      label: "Created",
    },
  ];

  return (
    <AdminLayout>

      <div className="requests-page">

        <div className="requests-stats-grid">

          <div className="requests-stat-card">
            <div className="requests-stat-label">
              Total Requests
            </div>

            <div className="requests-stat-value">
              {requests.length}
            </div>
          </div>

          <div className="requests-stat-card">
            <div className="requests-stat-label">
              Open
            </div>

            <div className="requests-stat-value">
              {
                requests.filter(
                  r => r.status === "Open"
                ).length
              }
            </div>
          </div>

          <div className="requests-stat-card">
            <div className="requests-stat-label">
              Matched
            </div>

            <div className="requests-stat-value">
              {
                requests.filter(
                  r => r.status === "Matched"
                ).length
              }
            </div>
          </div>

          <div className="requests-stat-card">
            <div className="requests-stat-label">
              Closed
            </div>

            <div className="requests-stat-value">
              {
                requests.filter(
                  r => r.status === "Closed"
                ).length
              }
            </div>
          </div>

        </div>

        <div className="requests-toolbar">

         <SearchBar
  placeholder="Search requests..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
/>

        <FilterBar
  filters={[
    "All",
    "Open",
    "Matched",
    "Closed"
  ]}
  activeFilter={activeFilter}
  onFilterChange={setActiveFilter}
/>

        </div>

        <DataTable
          columns={columns}
        data={filteredRequests}
          renderActions={(row) => (

            <button
              className="request-view-btn"
              onClick={() =>
                setSelectedRequest(row)
              }
            >
              View
            </button>

          )}
        />

        <Drawer
          isOpen={!!selectedRequest}
          onClose={() =>
            setSelectedRequest(null)
          }
          title="Request Details"
        >

          {selectedRequest && (

            <div className="request-detail-grid">

              <div className="request-detail-item">
                <strong>ID</strong>
                <span>
                  {selectedRequest.id}
                </span>
              </div>

              <div className="request-detail-item">
                <strong>User</strong>
                <span>
                  {selectedRequest.user}
                </span>
              </div>

              <div className="request-detail-item">
                <strong>Location</strong>
                <span>
                  {selectedRequest.location}
                </span>
              </div>

              <div className="request-detail-item">
                <strong>Budget</strong>
                <span>
                  {selectedRequest.budget}
                </span>
              </div>

              <div className="request-detail-item">
                <strong>Bedrooms</strong>
                <span>
                  {selectedRequest.bedrooms}
                </span>
              </div>

              <div className="request-detail-item">
                <strong>Status</strong>

                <StatusBadge
                  status={
                    selectedRequest.status
                  }
                />
              </div>

            </div>

          )}

        </Drawer>

      </div>

    </AdminLayout>
  );
};

export default Requests;