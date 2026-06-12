import "./Users.css";

import { useState } from "react";

import AdminLayout from "../components/layout/AdminLayout";
import StatusBadge from "../components/common/StatusBadge";

import UserDetailsDrawer
from "../components/users/UserDetailsDrawer";

import { users } from "../mockData";

const Users = () => {

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const openUser = (user) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

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
          u => u.role === "Agent"
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
          u => u.role === "Customer"
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
        users.filter(
          u =>
            u.verificationStatus ===
            "Pending"
        ).length
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

        <div className="users-table">

          <div className="users-header">

            <div>ID</div>
            <div>Name</div>
            <div>Role</div>
            <div>Status</div>
            <div>KYC</div>
            <div>Action</div>

          </div>

          {users.map(user => (

            <div
              className="users-row"
              key={user.id}
            >

              <div>{user.id}</div>

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
                    user.verificationStatus
                  }
                />
              </div>

              <div>

                <button
                  className="view-btn"
                  onClick={() => openUser(user)}
                >
                  View
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      <UserDetailsDrawer
        user={selectedUser}
        isOpen={drawerOpen}
        onClose={() =>
          setDrawerOpen(false)
        }
      />

    </AdminLayout>
  );
};

export default Users;