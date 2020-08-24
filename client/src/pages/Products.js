import React, { useEffect, useState } from 'react';

import PageTitle from '../components/Typography/PageTitle';
import {
  TableContainer,
  Table,
  TableHeader,
  TableFooter,
  Pagination,
  TableCell,
} from '@windmill/react-ui';
import { useSelector } from 'react-redux';
import { selectAllProduct } from '../store/products/products.selector';
import ProductTableBody from '../components/Products/ProductTableBody';

const Products = () => {
  const products = useSelector((state) => selectAllProduct(state));
  const [pageTable1, setPageTable1] = useState(1);
  const [dataTable1, setDataTable1] = useState([]);

  const resultsPerPage = 10;
  const totalResults = products.length;

  function onPageChangeTable1(p) {
    setPageTable1(p);
  }

  useEffect(() => {
    setDataTable1(
      products.slice(
        (pageTable1 - 1) * resultsPerPage,
        pageTable1 * resultsPerPage
      )
    );
  }, [pageTable1, products]);

  return (
    <>
      <PageTitle>Products</PageTitle>
      <div className='mb-8'>
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <ProductTableBody dataTable1={dataTable1} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={onPageChangeTable1}
              label='Table navigation'
            />
          </TableFooter>
        </TableContainer>
      </div>
    </>
  );
};

export default Products;
