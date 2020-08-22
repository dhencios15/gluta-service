import React from 'react';

import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../../icons';
import InfoCard from '../Cards/InfoCard';
import RoundIcon from '../RoundIcon';

const SummaryReport = () => {
  return (
    <>
      <InfoCard title='Products Sold' value='6389'>
        <RoundIcon
          icon={PeopleIcon}
          iconColorClass='text-orange-500 dark:text-orange-100'
          bgColorClass='bg-orange-100 dark:bg-orange-500'
          className='mr-4'
        />
      </InfoCard>

      <InfoCard title='Total Sales' value='$ 46,760.89'>
        <RoundIcon
          icon={MoneyIcon}
          iconColorClass='text-green-500 dark:text-green-100'
          bgColorClass='bg-green-100 dark:bg-green-500'
          className='mr-4'
        />
      </InfoCard>

      <InfoCard title='Remaining Products' value='376'>
        <RoundIcon
          icon={CartIcon}
          iconColorClass='text-blue-500 dark:text-blue-100'
          bgColorClass='bg-blue-100 dark:bg-blue-500'
          className='mr-4'
        />
      </InfoCard>

      <InfoCard title='Total Clients' value='35'>
        <RoundIcon
          icon={ChatIcon}
          iconColorClass='text-teal-500 dark:text-teal-100'
          bgColorClass='bg-teal-100 dark:bg-teal-500'
          className='mr-4'
        />
      </InfoCard>
    </>
  );
};

export default SummaryReport;
