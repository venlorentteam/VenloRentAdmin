import "./StatCard.css";

const StatCard = ({
  title,
  value,
  dotColor,
  subtitle
}) => {
  return (
    <div className="stat-card">
      <div className="stat-label">

        <span
          className="stat-dot"
          style={{ background: dotColor }}
        />

        {title}
      </div>

      <div className="stat-value">
        {value}
      </div>

      <div className="stat-subtitle">
        {subtitle}
      </div>
    </div>
  );
};

export default StatCard;