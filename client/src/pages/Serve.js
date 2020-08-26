import React, { useState } from 'react';
import {
  Input,
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Button,
} from '@windmill/react-ui';
import PageTitle from '../components/Typography/PageTitle';
import SectionTitle from '../components/Typography/SectionTitle';
import { SearchIcon, EditIcon } from '../icons';

const Serve = () => {
  const [search, setSearch] = useState('');
  const [client, setClient] = useState('');
  const data = [
    {
      name: 'dhencio',
      id: 1,
    },
    {
      name: 'dawn',
      id: 2,
    },
    {
      name: 'sasaw',
      id: 3,
    },
  ];

  const clientSelected = (name) => {
    setClient(name);
    setSearch('');
  };

  const item = data
    .filter((item) => {
      if (search == null) {
        return item;
      } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
        return item;
      }
    })
    .map((item) => {
      return (
        <li
          onClick={() => clientSelected(item.name)}
          key={item.id}
          className='ml-1 mr-1 p-1 hover:bg-gray-400 cursor-pointer'
        >
          {item.name}
        </li>
      );
    });

  return (
    <>
      <>
        <PageTitle>Serve</PageTitle>
        <div className='flex justify-start flex-1 lg:mr-32'>
          <div className='relative w-full max-w-xl mr-6 focus-within:text-purple-500'>
            <div className='absolute inset-y-0 flex items-center pl-2'>
              <SearchIcon className='w-4 h-4' aria-hidden='true' />
            </div>
            <Input
              className='pl-8 text-gray-700'
              placeholder='Search for Clients'
              aria-label='Search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className='flex justify-start flex-1 lg:mr-32 mt-2'>
          {search && (
            <div className='bg-gray-300 w-1/2 rounded-md overflow-hidden'>
              <ul className='text-gray-700 mt-2 mb-2'>{item}</ul>
            </div>
          )}
        </div>
        {client && (
          <div className='mt-5 ml-1'>
            <div className='flex items-center'>
              <SectionTitle>{client.toUpperCase()}</SectionTitle>
              <Button className='ml-2 -mt-4' size='small'>
                Action
              </Button>
            </div>
            <TableContainer className='mb-8'>
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>Date</TableCell>
                    <TableCell>Event</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Comment</TableCell>
                    <TableCell>Actions</TableCell>
                  </tr>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <span className='text-sm'>12/15/93</span>
                    </TableCell>
                    <TableCell>
                      <span className='text-sm'>Inject</span>
                    </TableCell>
                    <TableCell>
                      <span className='text-sm'>₱ 500</span>
                    </TableCell>
                    <TableCell>
                      <Badge type='success'>Paid</Badge>
                    </TableCell>
                    <TableCell>
                      <span className='text-sm'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Voluptatem, ipsa!
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button layout='link' size='icon' aria-label='Edit'>
                        <EditIcon className='w-5 h-5' aria-hidden='true' />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <TableFooter>
                {/* <Pagination
                  totalResults={totalResults}
                  resultsPerPage={resultsPerPage}
                  onChange={onPageChangeTable2}
                  label='Table navigation'
                /> */}
              </TableFooter>
            </TableContainer>
          </div>
        )}
      </>
    </>
  );
};

export default Serve;
