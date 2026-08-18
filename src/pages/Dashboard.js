import "./Dashboard.css";
import { useEffect, useMemo, useState } from "react";
import { getDashboardOverview } from "../services/dashboardService";
import AdminLayout from "../components/layout/AdminLayout";
import StatCard from "../components/cards/StatCard";
import { RiShieldCheckLine, RiShoppingBag3Line } from "react-icons/ri";
import Loader from "../components/layout/Loader";

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

const EMPTY_OVERVIEW = {
  stats: {
    totalUsers: 0,
    verifiedAgents: 0,
    pendingKycCount: 0,
    completedOrdersCount: 0,
    listingsCount: 0,
    paymentsCount: 0,
    moderationQueueCount: 0,
  },
  kycApplications: [],
  orders: [],
  payments: [],
  flaggedItems: [],
  recentActivities: [],
};

const Dashboard = () => {
  const [overview, setOverview] = useState(EMPTY_OVERVIEW);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setFetchError("Missing admin token. Please log in again.");
        return;
      }

      setIsLoading(true);

      try {
        const res = await getDashboardOverview(token);
        setOverview(res.data?.overview || EMPTY_OVERVIEW);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.response?.data?.message || err.message || "Failed to fetch dashboard overview");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOverview();
  }, []);

  const {
    stats,
    kycApplications,
    orders,
    payments,
    flaggedItems,
    recentActivities,
  } = overview;

  const pendingKyc = stats.pendingKycCount || kycApplications.filter((item) => item.status === "pending").length;
  const completedOrders = stats.completedOrdersCount || orders.filter((order) => order.status === "Completed").length;

  const pendingApplications = useMemo(
    () => kycApplications.filter((item) => item.status === "pending"),
    [kycApplications]
  );

  return (
    <AdminLayout>
      {isLoading && <Loader />}

      <div className="dashboard">
        <div className="stats-grid">
          <StatCard
            title="Registered users"
            value={stats.totalUsers}
            dotColor="#10b981"
            subtitle="From the admin user registry"
          />

          <StatCard
            title="Verified agents"
            value={stats.verifiedAgents}
            dotColor="#3b82f6"
            subtitle="Users with verified KYC"
          />

          <StatCard
            title="Pending KYC"
            value={pendingKyc}
            dotColor="#f59e0b"
            subtitle="KYC submissions awaiting review"
          />

          <StatCard
            title="Completed orders"
            value={completedOrders}
            dotColor="#8b5cf6"
            subtitle="Orders marked as completed"
          />
        </div>

        {fetchError && <div className="error-message">{fetchError}</div>}

        <div className="dashboard-bottom-grid">
          <div className="dashboard-card">
            <div className="dashboard-card-title">Recent Activity</div>

            <div className="activity-list">
              {recentActivities.length > 0 ? (
                recentActivities.map((item) => (
                  <div key={item.id} className="activity-item">
                    <div>
                      <div className="activity-action">{item.action}</div>
                      <div className="activity-user">{item.user}</div>
                    </div>

                    <div className="activity-time">{item.time}</div>
                  </div>
                ))
              ) : (
                <div className="empty-message">No recent activity yet.</div>
              )}
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-title">Quick Metrics</div>

            <div className="quick-metric">
              <span>Users</span>
              <strong>{stats.totalUsers}</strong>
            </div>

            <div className="quick-metric">
              <span>Listings</span>
              <strong>{stats.listingsCount}</strong>
            </div>

            <div className="quick-metric">
              <span>Orders</span>
              <strong>{orders.length}</strong>
            </div>

            <div className="quick-metric">
              <span>Payments</span>
              <strong>{payments.length}</strong>
            </div>

            <div className="quick-metric">
              <span>Pending KYC</span>
              <strong>{pendingKyc}</strong>
            </div>

            <div className="quick-metric">
              <span>Moderation Queue</span>
              <strong>{stats.moderationQueueCount}</strong>
            </div>
          </div>
        </div>

        <div className="dashboard-body">
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">
                <RiShieldCheckLine />
                KYC verification queue
              </div>

              <button className="panel-action">View all</button>
            </div>

            <div className="panel-content">
              <div className="kyc-tabs">
                <div className="kyc-tab active">Pending ({pendingKyc})</div>
                <div className="kyc-tab">Approved</div>
                <div className="kyc-tab">Rejected</div>
              </div>

              {pendingApplications.length > 0 ? (
                pendingApplications.map((item) => (
                  <div className="kyc-row" key={item.id}>
                    <div className="avatar">{getInitials(item.applicantName)}</div>

                    <div className="kyc-info">
                      <div className="kyc-name">{item.applicantName}</div>
                      <div className="kyc-meta">
                        {item.submittedAt} {" | "} {item.location}
                      </div>
                    </div>

                    <div className="step-dots">
                      <span
                        className={`step-dot ${
                          item.livenessCheck === "passed"
                            ? "dot-passed"
                            : item.livenessCheck === "failed"
                            ? "dot-failed"
                            : "dot-pending"
                        }`}
                      />

                      <span
                        className={`step-dot ${
                          item.idVerification === "passed"
                            ? "dot-passed"
                            : item.idVerification === "failed"
                            ? "dot-failed"
                            : "dot-pending"
                        }`}
                      />

                      <span
                        className={`step-dot ${
                          item.proofOfAddress === "passed"
                            ? "dot-passed"
                            : item.proofOfAddress === "failed"
                            ? "dot-failed"
                            : "dot-pending"
                        }`}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-message">No pending KYC applications right now.</div>
              )}
            </div>
          </div>

          <div className="right-column">
            <div className="panel">
              <div className="panel-header">
                <div className="panel-title">
                  <RiShieldCheckLine />
                  Flagged content
                </div>

                <button className="panel-action">Review</button>
              </div>

              <div className="panel-content">
                {flaggedItems.length > 0 ? (
                  flaggedItems.map((item) => (
                    <div className="flag-row" key={item.id}>
                      <span>
                        {item.type}: {item.reason}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="empty-message">Nothing flagged for review.</div>
                )}
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div className="panel-title">
                  <RiShoppingBag3Line />
                  Recent orders
                </div>

                <button className="panel-action">View all</button>
              </div>

              <div className="panel-content">
                {orders.length > 0 ? (
                  orders.slice(0, 6).map((order) => (
                    <div className="order-row" key={order.id}>
                      <div className="order-id">#{order.id}</div>
                      <div className="order-amount">{order.amount}</div>
                    </div>
                  ))
                ) : (
                  <div className="empty-message">No recent orders yet.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
