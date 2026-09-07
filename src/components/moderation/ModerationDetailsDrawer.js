import "./ModerationDetailsDrawer.css";

const ModerationDetailsDrawer = ({
  item,
  isOpen,
  onClose,
  onSuspendUser,
}) => {
  if (!isOpen || !item) return null;

  const isReport = item.id.startsWith("report-")
  const isProperty = item.type === "Property"
  const isMessageReport = item.targetType === "message"
  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="moderation-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>{isReport ? "Report Details" : "Property Details"}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="drawer-content">
          <div className="detail-section">
            <h3>Overview</h3>
            <div className="detail-row">
              <label>Type</label>
              <p>{item.type}</p>
            </div>
            <div className="detail-row">
              <label>Target</label>
              <p>{item.target}</p>
            </div>
            <div className="detail-row">
              <label>Status</label>
              <p>
                <span className={`status-badge ${item.status.toLowerCase().replace(/\s+/g, "-")}`}>
                  {item.status}
                </span>
              </p>
            </div>
            <div className="detail-row">
              <label>Reports</label>
              <p>{item.reports}</p>
            </div>
            <div className="detail-row">
              <label>Submitted</label>
              <p>{new Date(item.createdAt).toLocaleString()}</p>
            </div>
          </div>

          <div className="detail-section">
            <h3>Reason</h3>
            <p className="reason-text">{item.reason}</p>
          </div>

          {isReport && (
            <div className="detail-section">
              <h3>Report Details</h3>
              <div className="detail-row">
                <label>Target Type</label>
                <p>{item.targetType}</p>
              </div>
              <div className="detail-row">
                <label>Target ID</label>
                <p>{item.targetId}</p>
              </div>
            </div>
          )}

          {isMessageReport && item.metadata?.participants?.length > 0 && onSuspendUser && (
            <div className="detail-section">
              <h3>Conversation Participants</h3>
              {item.metadata.participants.map((userId) => (
                <div className="detail-row" key={userId}>
                  <label>User ID</label>
                  <p>
                    {userId}{" "}
                    <button
                      className="action-btn remove-btn"
                      onClick={() => onSuspendUser(userId)}
                    >
                      Suspend
                    </button>
                  </p>
                </div>
              ))}
            </div>
          )}

          {isProperty && (
            <div className="detail-section">
              <h3>Property Details</h3>
              <div className="detail-row">
                <label>Property ID</label>
                <p>{item.targetId}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModerationDetailsDrawer;