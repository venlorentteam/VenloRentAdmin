import "./KYCVerification.css";
import {
  useState,
  useMemo
} from "react";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import KYCReviewDrawer from "../components/kyc/KYCReviewDrawer";
import AdminLayout from "../components/layout/AdminLayout";
import StatusBadge from "../components/common/StatusBadge";

import { kycApplications } from "../mockData";

const KYCVerification = () => {
const [selectedApplication, setSelectedApplication] =
  useState(null);

const [drawerOpen, setDrawerOpen] =
  useState(false);

  const [searchTerm, setSearchTerm] =
  useState("");

const [activeFilter, setActiveFilter] =
  useState("All");

const filteredApplications =
  useMemo(() => {

    return kycApplications.filter(
      application => {

        const matchesSearch =

          application.applicantName
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||

          application.location
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        const matchesFilter =

          activeFilter === "All"
            ? true
            : application.status
                .toLowerCase()
                ===
              activeFilter
                .toLowerCase();

        return (
          matchesSearch &&
          matchesFilter
        );

      }
    );

  }, [
    searchTerm,
    activeFilter
  ]);

const openReview = (application) => {
  setSelectedApplication(application);
  setDrawerOpen(true);
};
  return (
    <AdminLayout>

      <div className="kyc-page">

        <div className="kyc-toolbar">

  <SearchBar
    placeholder="Search applicant..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
  />

  <FilterBar
    filters={[
      "All",
      "Pending",
      "Approved",
      "Rejected"
    ]}
    activeFilter={activeFilter}
    onFilterChange={setActiveFilter}
  />

</div>

        <div className="kyc-table">

          <div className="kyc-table-header">

            <div>Applicant</div>
            <div>Location</div>
            <div>Submitted</div>
            <div>Status</div>
            <div>Action</div>

          </div>

        {filteredApplications.map(item => (

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