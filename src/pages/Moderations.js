import { useState, useEffect } from "react";

import "./Moderations.css";

import AdminLayout from "../components/layout/AdminLayout";
import StatusBadge from "../components/common/StatusBadge";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import PaginationControls from "../components/common/PaginationControls";
import usePaginatedResource from "../hooks/usePaginatedResource";
import ModerationDetailsDrawer from "../components/moderation/ModerationDetailsDrawer";
import { updateUserStatus } from "../services/userService";

import Loader from "../components/layout/Loader"
import { getModerationQueue, performModerationAction } from "../services/moderationService"

const MODERATION_FILTERS = ["All", "Open", "In Review", "Pending", "Flagged", "Rejected"]
const MODERATION_TYPES = ["All", "Report", "Property", "Request"]

const STATUS_VALUE_MAP = {
  Open: "open",
  "In Review": "in_review",
  Pending: "pending",
  Flagged: "flagged",
  Rejected: "rejected",
}

const Moderations = () => {
  const [searchInput, setSearchInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [savingId, setSavingId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);


  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(searchInput), 400);
    return () => clearTimeout(id);
  }, [searchInput])

  const fetchQueue = ({ page, limit }) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Missing admin token.");
    return getModerationQueue(token, {
      page,
      limit,
      search: searchTerm,
      status: activeFilter === "All" ? "All" : STATUS_VALUE_MAP[activeFilter],
      type: activeType,
    })
  }

  const {
    items,
    pagination,
    loading,
    error,
    goToPage,
    setLimit,
    reload
  } = usePaginatedResource({
    fetchPage: fetchQueue,
    initialLimit: 12,
    deps: [searchTerm, activeFilter, activeType],
  })

  const handleAction = async (item, beAction, payload = {}) => {
    const token = localStorage.getItem("token")
    if (!token) return

    setSavingId(item.id);
    try {
      const isReport = item.id.startsWith("report-");
      const type = isReport ? "report" : item.id.startsWith("request-") ? "request" : "property";
      const realId = item.id.split("-").slice(1).join("-")

      await performModerationAction(token, type, realId, beAction, payload)
      reload()
    } catch (err) {
      alert(err.response?.data?.message || "Action failed")
    } finally {
      setSavingId(null)
    }
  }
  const handleSuspendUser = async (userId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await updateUserStatus(userId, "suspended");
      alert("User suspended.");
      closeDrawer();
      reload();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to suspend user");
    }
  }

  const openDrawer = (item) => {
    setSelectedItem(item);
  }

  const closeDrawer = () => {
    setSelectedItem(null);
  }

  return (
    <AdminLayout>
      <div className="moderation-page">
        <div className="moderation-toolbar">
          <SearchBar
            placeholder="Search moderation queue..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div className="moderation-toolbar-filters">
            <FilterBar
              filters={MODERATION_TYPES}
              activeFilter={activeType}
              onFilterChange={setActiveType}
            />
            <FilterBar
              filters={MODERATION_FILTERS}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {loading && <Loader />}

        {!loading && (
          <>
            <div className="moderation-grid">
              {items.map((item) => (
                <div className="moderation-card" key={item.id} onClick={() => openDrawer(item)}>
                  <div className="moderation-type">{item.type}</div>
                  <div className="moderation-title">{item.target}</div>
                  <div className="moderation-meta">
                    <span>Reason: {item.reason}</span>
                    <span>Reports: {item.reports}</span>
                  </div>
                  <StatusBadge status={item.status} />
                  <div className="moderation-actions">
                    {item.id.startsWith("report-") ? (
                      <>
                        <button
                          className="action-btn review-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            const note = window.prompt("Resolution note (optional):", "");
                            if (note === null) return; // user cancelled — don't submit anything
                            handleAction(item, "resolve", { resolutionNote: note });
                          }}
                          disabled={savingId === item.id}
                        >
                          {savingId === item.id ? "Saving..." : "Resolve"}
                        </button>
                        <button
                          className="action-btn dismiss-btn"
                          onClick={(e) => { e.stopPropagation(); handleAction(item, "dismiss"); }}
                          disabled={savingId === item.id}
                        >
                          Dismiss
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="action-btn review-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            const note = window.prompt("Resolution note (optional):", "");
                            if (note === null) return;
                            handleAction(item, "approve", { resolutionNote: note });
                          }}
                          disabled={savingId === item.id}
                        >
                          {savingId === item.id ? "Saving..." : "Approve"}
                        </button>
                        <button
                          className="action-btn remove-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            const note = window.prompt("Resolution note (optional):", "");
                            if (note === null) return;
                            handleAction(item, "remove", { resolutionNote: note });
                          }}
                          disabled={savingId === item.id}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {items.length === 0 && (
              <div className="empty-message">No moderation items found.</div>
            )}

            <PaginationControls
              pagination={pagination}
              onPageChange={goToPage}
              onLimitChange={setLimit}
            />
          </>
        )}

        <ModerationDetailsDrawer 
          item={selectedItem} 
          isOpen={!!selectedItem} 
          onClose={closeDrawer} 
          onSuspendUser={handleSuspendUser} 
        />
      </div>
    </AdminLayout>
  );
};

export default Moderations;