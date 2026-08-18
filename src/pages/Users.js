import "./Users.css";

import React, { useEffect } from "react";
import { useState } from "react";
import { getUsers, updateUserStatus } from "../services/userService"
import AdminLayout from "../components/layout/AdminLayout"
import StatusBadge from "../components/common/StatusBadge"
import UserDetailsDrawer from "../components/users/UserDetailsDrawer";
import Loader from "../components/layout/Loader";

// import { users } from "../mockData";
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

const isPendingKyc = (status) => status === "in_review";

const Users = () => {

  const [selectedUser, setSelectedUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState("view");
  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
    // Fetch users from API
      try{
        const res = await getUsers(token);
        setUsers(res.data.users || []);
      }
      catch(err){
        setFetchError(err.message || "Failed to fetch users");
        return null;
      }
      finally{
        setLoading(false);
      }
    }
    fetchUsers()
  }, [])

  const openUser = (user) => {
    setSelectedUser(user);
    setDrawerOpen(true);
    setDrawerMode("view");
  };

  const openStatusEditor = (user) => {
    setSelectedUser(user);
    setDrawerOpen(true);
    setDrawerMode("edit");
  };

  const handleStatusChange = async (nextStatus) => {
    if (!selectedUser || nextStatus === selectedUser.status) return;

    setSavingStatus(true);
    try {
      const userId = selectedUser._id || selectedUser.id;
      const res = await updateUserStatus(userId, nextStatus);
      const updatedUser = res.data.user;

      // Keep the list and drawer in sync after a successful status update.
      setUsers((current) =>
        current.map((user) =>
          (user._id || user.id) === (updatedUser._id || updatedUser.id)
            ? { ...user, status: updatedUser.status }
            : user
        )
      );
      setSelectedUser((current) =>
        current ? { ...current, status: updatedUser.status } : current
      );
      setDrawerMode("view");
    } catch (err) {
      setFetchError(err.message || "Failed to update user status");
    } finally {
      setSavingStatus(false);
    }
  };

  const kycUsers = users.filter(
    (user) => isPendingKyc(user?.kycStatus)
  );

  return (
    <AdminLayout>

      <div className="users-page">
        <div className="user-stats-grid">

          <div className="user-stat-card">
            <div className="user-stat-label">
              Total Users
            </div>

            <div className="user-stat-value">
              {users.length}
            </div>
          </div>

          <div className="user-stat-card">
            <div className="user-stat-label">
              Agents
            </div>

            <div className="user-stat-value">
              {
                users.filter(
                  u => u.role === "agent"
                ).length
              }
            </div>
          </div>

          <div className="user-stat-card">
            <div className="user-stat-label">
              Customers
            </div>

            <div className="user-stat-value">
              {
                users.filter(
                  u => u.role === "regular"
                ).length
              }
            </div>
          </div>

          <div className="user-stat-card">
            <div className="user-stat-label">
              Pending KYC
            </div>

            <div className="user-stat-value">
              {
                kycUsers.length
              }
            </div>
          </div>

        </div>
        <div className="users-toolbar">

          <input
            className="users-search"
            placeholder="Search users..."
          />

        </div>
        {fetchError && <div className="error-message">{fetchError}</div>}
        <div className="users-table">
          {loading && <Loader />}
          <div className="users-header">

            <div>Username</div>
            <div>Name</div>
            <div>Role</div>
            <div>Status</div>
            <div>KYC</div>
            <div>Action</div>

          </div>

          {users.map(user => (

            <div
              className="users-row"
              key={user.username}
            >

              <div>{user.username}</div>

              <div>
                <div className="user-name">
                  {user.fullName}
                </div>

                <small>
                  {user.email}
                </small>
              </div>

              <div>{user.role}</div>

              <div>
                <StatusBadge
                  status={user.status}
                />
              </div>

              <div>
                <StatusBadge
                  status={
                    formatKycStatus(user?.kycStatus)
                  }
                />
              </div>

              <div className="user-actions">

                <button
                  className="view-btn"
                  onClick={() => openUser(user)}
                >
                  View
                </button>

                <button
                  className="modify-btn"
                  onClick={() => openStatusEditor(user)}
                >
                  Modify
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      <UserDetailsDrawer
        user={selectedUser}
        isOpen={drawerOpen}
        mode={drawerMode}
        isSaving={savingStatus}
        onSaveStatus={handleStatusChange}
        onClose={() =>
          setDrawerOpen(false)
        }
      />

    </AdminLayout>
  );
};

export default Users;
