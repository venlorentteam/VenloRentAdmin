import React from 'react'

const StatusBadge = ({ children, status }) => {
  return (
    <span className={`status-badge${status ? ` status-badge--${status}` : ''}`}>
      {children}
    </span>
  )
}

export default StatusBadge
