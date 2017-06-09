import React, { PropTypes, Component } from 'react';
import DashboardMenu from './DashboardMenu';

class Dashboard extends Component {

  render() {

    return (
      <div>
        <DashboardMenu/>
        <p>This is dashboard page</p>
      </div>
    );

  }

}

export default Dashboard;
