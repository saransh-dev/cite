import React from 'react';
import { Link } from 'react-router';

const AdminButton = () => {

  return (
    <Link to="/admin/dashboard" activeClassName="active">Dashboard</Link>
  );

};

export default AdminButton;
