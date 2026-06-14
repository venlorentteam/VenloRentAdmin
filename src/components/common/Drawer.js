import "./Drawer.css";

const Drawer = ({
  isOpen,
  onClose,
  title,
  children
}) => {

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay">

      <div className="shared-drawer">

        <div className="drawer-header">

          <h2>{title}</h2>

          <button onClick={onClose}>
            ✕
          </button>

        </div>

        <div className="drawer-body">
          {children}
        </div>

      </div>

    </div>
  );
};

export default Drawer;