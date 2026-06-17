import "./Dashboard.css";

import AdminLayout from "../components/layout/AdminLayout";
import StatCard from "../components/cards/StatCard";

import {
  users,
  kycApplications,
  orders,
  flaggedItems
} from "../mockData";

import { RiShieldCheckLine, RiShoppingBag3Line } from "react-icons/ri";

const Dashboard = () => {
  const verifiedAgents =
    users.filter(
      user =>
        user.role === "agent" &&
        user.verificationStatus === "verified"
    ).length;

  const pendingKyc =
    kycApplications.filter(
      kyc => kyc.status === "pending"
    ).length;

  const completedOrders =
    orders.filter(
      order => order.status === "completed"
    ).length;

  const pendingApplications =
    kycApplications.filter(
      item => item.status === "pending"
    );

  return (
    <AdminLayout>
      <div className="dashboard">
        <div className="stats-grid">
          <StatCard
            title="Registered users"
            value={users.length}
            dotColor="#10b981"
            subtitle="+34 this week"
          />

          <StatCard
            title="Verified agents"
            value={verifiedAgents}
            dotColor="#3b82f6"
            subtitle="+7 this week"
          />

          <StatCard
            title="Pending KYC"
            value={pendingKyc}
            dotColor="#f59e0b"
            subtitle="Needs review"
          />

          <StatCard
            title="Completed orders"
            value={completedOrders}
            dotColor="#8b5cf6"
            subtitle="+12 this month"
          />

        </div>

        <div className="dashboard-body">

          <div className="panel">

            <div className="panel-header">

              <div className="panel-title">
                <RiShieldCheckLine/>
                KYC verification queue
              </div>

              <button className="panel-action">
                View all
              </button>

            </div>

            <div className="panel-content">

              <div className="kyc-tabs">

                <div className="kyc-tab active">
                  Pending ({pendingKyc})
                </div>

                <div className="kyc-tab">
                  Approved
                </div>

                <div className="kyc-tab">
                  Rejected
                </div>

              </div>

              {pendingApplications.map((item) => (
                <div
                  className="kyc-row"
                  key={item.id}
                >

                  <div className="avatar">
                    {item.applicantName
                      .split(" ")
                      .map(name => name[0])
                      .join("")}
                  </div>

                  <div className="kyc-info">

                    <div className="kyc-name">
                      {item.applicantName}
                    </div>

                    <div className="kyc-meta">
                      {item.submittedAt}
                      {" · "}
                      {item.location}
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
              ))}

            </div>

          </div>

          <div className="right-column">

            <div className="panel">

              <div className="panel-header">

                <div className="panel-title">
                  <RiShieldCheckLine />
                  Flagged content
                </div>

                <button className="panel-action">
                  Review
                </button>

              </div>

              <div className="panel-content">

                {flaggedItems.map((item) => (
                  <div
                    className="flag-row"
                    key={item.id}
                  >
                    <span>{item.reason}</span>
                  </div>
                ))}

              </div>

            </div>

            <div className="panel">

              <div className="panel-header">

                <div className="panel-title">
                  <RiShoppingBag3Line />
                  Recent orders
                </div>

                <button className="panel-action">
                  View all
                </button>

              </div>

              <div className="panel-content">

                {orders.map((order) => (
                  <div
                    className="order-row"
                    key={order.id}
                  >

                    <div className="order-id">
                      #{order.id}
                    </div>

                    <div className="order-amount">
                      ₦{order.amount?.toLocaleString()}
                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
};

export default Dashboard;