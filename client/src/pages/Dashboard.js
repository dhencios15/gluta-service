import React from 'react';

import PageTitle from '../components/Typography/PageTitle';
import SummaryReport from '../components/Dashboard/SummaryReport';

const Dashboard = () => {
  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <div className='grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4'>
        <SummaryReport />
      </div>
    </>
  );
};

export default Dashboard;
