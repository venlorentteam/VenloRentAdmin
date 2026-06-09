import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import './AdminLayout.css'

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-layout__main">
        <Header />
        <main className="admin-layout__content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
