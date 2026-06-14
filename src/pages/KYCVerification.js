import "./KYCVerification.css";
import { useState } from "react";
import KYCReviewDrawer from "../components/kyc/KYCReviewDrawer";
import AdminLayout from "../components/layout/AdminLayout";
import StatusBadge from "../components/common/StatusBadge";

import { kycApplications } from "../mockData";

const KYCVerification = () => {
const [selectedApplication, setSelectedApplication] =
  useState(null);

const [drawerOpen, setDrawerOpen] =
  useState(false);

const openReview = (application) => {
  setSelectedApplication(application);
  setDrawerOpen(true);
};
  return (
    <AdminLayout>

      <div className="kyc-page">

        <div className="kyc-toolbar">

          <input
            className="kyc-search"
            placeholder="Search applicant..."
          />

          <div className="kyc-filters">

            <button className="filter-btn">
              Pending
            </button>

            <button className="filter-btn">
              Approved
            </button>

            <button className="filter-btn">
              Rejected
            </button>

          </div>

        </div>

        <div className="kyc-table">

          <div className="kyc-table-header">

            <div>Applicant</div>
            <div>Location</div>
            <div>Submitted</div>
            <div>Status</div>
            <div>Action</div>

          </div>

          {kycApplications.map(item => (

            <div
              className="kyc-table-row"
              key={item.id}
            >

              <div className="applicant">

                <div className="applicant-avatar">

                  {item.applicantName
                    .split(" ")
                    .map(n => n[0])
                    .join("")}

                </div>

                <div>

                  <div className="applicant-name">
                    {item.applicantName}
                  </div>

                  <div className="applicant-meta">
                    Liveness • ID • Address
                  </div>

                </div>

              </div>

              <div>{item.location}</div>

              <div>{item.submittedAt}</div>

              <div>
                <StatusBadge
                  status={item.status}
                />
              </div>

              <div>

                <button
  className="review-btn"
  onClick={() => openReview(item)}
>
  Review
</button>

              </div>

            </div>

          ))}

        </div>

      </div>
<KYCReviewDrawer
  application={selectedApplication}
  isOpen={drawerOpen}
  onClose={() => setDrawerOpen(false)}
/>
    </AdminLayout>
  );
};

export default KYCVerification;