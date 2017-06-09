import React from 'react';
import { FormattedMessage } from 'react-intl';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
        <div className="breadcrumbs">
            <span>Admin Dashboard</span>
        </div>
        <div className="user-directory section--grey section--padding clearfix">
            <p>This is a dashboard page.</p>
        </div>
    </div>
  );
};

AdminDashboard.displayName = "AdminDashboard";

module.exports = AdminDashboard;
export default AdminDashboard;