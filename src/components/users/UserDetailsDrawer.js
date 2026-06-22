import React, { useEffect, useState } from "react";
import "./UserDetailsDrawer.css";

const formatKycStatus = (status) => {
  const labels = {
    unsubmitted: "Unsubmitted",
    submitted: "Submitted",
    in_review: "In Review",
    verified: "Verified",
    rejected: "Rejected",
  };

  return labels[status] || "Unsubmitted";
};

const editableStatuses = [
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
  { value: "deactivated", label: "Deactivated" },
];

const UserDetailsDrawer = ({
  user,
  isOpen,
  mode = "view",
  isSaving = false,
  onSaveStatus,
  onClose,
}) => {
  const [draftStatus, setDraftStatus] = useState(user?.status || "active");

  useEffect(() => {
    // Keep the draft aligned with the selected user when switching rows.
    setDraftStatus(user?.status || "active");
  }, [user]);

  if (!isOpen || !user) return null;

  const isEditing = mode === "edit";

  return (
    <div className="drawer-overlay">
      <div className="user-drawer">
        <div className="drawer-header">
          <h2>User Details</h2>

          <button onClick={onClose} aria-label="Close drawer">
            x
          </button>
        </div>

        <div className="drawer-content">
          <div className="detail-row">
            <label>Name</label>
            <p>{user.fullName}</p>
          </div>

          <div className="detail-row">
            <label>Email</label>
            <p>{user.email}</p>
          </div>

          <div className="detail-row">
            <label>Phone</label>
            <p>{user.phone}</p>
          </div>

          <div className="detail-row">
            <label>Role</label>
            <p>{user.role}</p>
          </div>

          <div className="detail-row">
            <label>Status</label>
            <p>{user.status}</p>
          </div>

          {isEditing ? (
            <div className="detail-row">
              <label>Change status</label>
              <select
                className="drawer-select"
                value={draftStatus}
                onChange={(e) => setDraftStatus(e.target.value)}
                disabled={isSaving}
              >
                {editableStatuses.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="drawer-note">
                Only the user account status can be changed here.
              </p>
            </div>
          ) : null}

          <div className="detail-row">
            <label>Plan</label>
            <p>{user.plan}</p>
          </div>

          <div className="detail-row">
            <label>Verification</label>
            <p>{formatKycStatus(user?.kycStatus)}</p>
          </div>
        </div>

        {isEditing ? (
          <div className="drawer-footer">
            <button
              className="drawer-btn drawer-btn-secondary"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              className="drawer-btn drawer-btn-primary"
              onClick={() => onSaveStatus?.(draftStatus)}
              disabled={isSaving || draftStatus === user.status}
            >
              {isSaving ? "Saving..." : "Save status"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserDetailsDrawer;
