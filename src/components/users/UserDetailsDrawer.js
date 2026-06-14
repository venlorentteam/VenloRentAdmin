import "./UserDetailsDrawer.css";

const UserDetailsDrawer = ({
  user,
  isOpen,
  onClose
}) => {

  if (!isOpen || !user) return null;

  return (
    <div className="drawer-overlay">

      <div className="user-drawer">

        <div className="drawer-header">

          <h2>User Details</h2>

          <button onClick={onClose}>
            ✕
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

          <div className="detail-row">
            <label>Verification</label>
            <p>{user.verificationStatus}</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default UserDetailsDrawer;