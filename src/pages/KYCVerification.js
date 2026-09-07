import "./KYCVerification.css"
import { useState } from "react"
import SearchBar from "../components/common/SearchBar"
import FilterBar from "../components/common/FilterBar"
import KYCReviewDrawer from "../components/kyc/KYCReviewDrawer"
import AdminLayout from "../components/layout/AdminLayout"
import StatusBadge from "../components/common/StatusBadge"
import Loader from "../components/layout/Loader"
import PaginationControls from "../components/common/PaginationControls"
import usePaginatedResource from "../hooks/usePaginatedResource"
import { getApplications, updateApplicationStatus } from "../services/kycService"

const KYC_FILTERS = ["All", "submitted", "in_review", "verified", "rejected"];

const KYCVerification = () => {
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [savingAction, setSavingAction] = useState(false)

  const fetchApplications = ({ page, limit }) => {
    const token = localStorage.getItem("token")

    if (!token) {
      throw new Error("Missing admin token. Please log in again.")
    }

    return getApplications(token, {
      page,
      limit,
      search: searchTerm,
      status: activeFilter,
    })
  }

  const {
    items: applications,
    pagination,
    summary,
    loading,
    error,
    goToPage,
    setLimit,
    reload,
  } = usePaginatedResource({
    fetchPage: fetchApplications,
    initialLimit: 10,
    deps: [searchTerm, activeFilter],
  })

  const openReview = (application) => {
    setSelectedApplication(application)
  }

  const closeDrawer = () => {
    setSelectedApplication(null)
  }

  const updateStatus = async (nextStatus) => {
    if (!selectedApplication || savingAction) return

    const token = localStorage.getItem("token")
    if (!token) return

    setSavingAction(true)

    try {
      await updateApplicationStatus(token, selectedApplication.id, { status: nextStatus });
      closeDrawer()
      await reload()
    } catch (err) {
      console.error("Failed to update KYC status:", err)
    } finally {
      setSavingAction(false)
    }
  };

  return (
    <AdminLayout>
      <div className="kyc-page">
        {loading && <Loader />}

        <div className="orders-stats-grid">
          <div className="orders-stat-card">
            <div className="orders-stat-label">Total KYC</div>
            <div className="orders-stat-value">{summary.totalKyc ?? pagination.totalItems ?? 0}</div>
          </div>
          <div className="orders-stat-card">
            <div className="orders-stat-label">Pending</div>
            <div className="orders-stat-value">{summary.pendingKyc ?? 0}</div>
          </div>
          <div className="orders-stat-card">
            <div className="orders-stat-label">Approved</div>
            <div className="orders-stat-value">{summary.approvedKyc ?? 0}</div>
          </div>
          <div className="orders-stat-card">
            <div className="orders-stat-label">Rejected</div>
            <div className="orders-stat-value">{summary.rejectedKyc ?? 0}</div>
          </div>
        </div>

        <div className="kyc-toolbar">
          <SearchBar
            placeholder="Search applicant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <FilterBar
            filters={KYC_FILTERS}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="kyc-table">
          <div className="kyc-table-header">
            <div>Applicant</div>
            <div>Location</div>
            <div>Submitted</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          {applications.map((item) => (
            <div className="kyc-table-row" key={item.id}>
              <div className="applicant">
                <div className="applicant-avatar">
                  {item.applicantName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <div>
                  <div className="applicant-name">{item.applicantName}</div>
                  <div className="applicant-meta">Liveness • ID • Address</div>
                </div>
              </div>

              <div>{item.location}</div>
              <div>{item.submittedAt}</div>

              <div>
                <StatusBadge status={item.status} />
              </div>

              <div>
                <button className="review-btn" onClick={() => openReview(item)}>
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>

        {!loading && applications.length === 0 && (
          <div className="empty-message">No KYC applications found.</div>
        )}

        <PaginationControls
          pagination={pagination}
          onPageChange={goToPage}
          onLimitChange={setLimit}
        />
      </div>

      <KYCReviewDrawer
        application={selectedApplication}
        isOpen={!!selectedApplication}
        onClose={closeDrawer}
        onApprove={() => updateStatus("verified")}
        onReject={() => updateStatus("rejected")}
        isSaving={savingAction}
      />
    </AdminLayout>
  )
}

export default KYCVerification;
