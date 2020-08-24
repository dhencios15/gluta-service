import React from 'react';

import { TableBody, TableRow, TableCell, Button } from '@windmill/react-ui';
import { EditIcon, TrashIcon } from '../../icons';

const ProductTableBody = ({ dataTable1 }) => {
  return (
    <TableBody>
      {dataTable1.map((product, i) => (
        <TableRow key={i}>
          <TableCell>
            <span className='text-sm'>{product.title}</span>
          </TableCell>
          <TableCell>
            <span className='text-sm'>{product.description}</span>
          </TableCell>
          <TableCell>
            <span className='text-sm'>{product.price}</span>
          </TableCell>
          <TableCell>
            <span className='text-sm'>{product.quantity}</span>
          </TableCell>
          <TableCell>
            <div className='flex items-center space-x-4'>
              <Button layout='link' size='icon' aria-label='Edit'>
                <EditIcon className='w-5 h-5' aria-hidden='true' />
              </Button>
              <Button layout='link' size='icon' aria-label='Delete'>
                <TrashIcon
                  className='w-5 h-5 text-red-500'
                  aria-hidden='true'
                />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ProductTableBody;
