import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';

const TransactionsTable = ({ selectedMonth, searchText }) => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, searchText]);

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, searchText, currentPage]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/transactions', {
        params: {
          month: selectedMonth,
          search: searchText,
          page: currentPage,
          perPage: rowsPerPage,
        },
      });

      const fetchedTransactions = response.data.transactions;
      const totalItems = response.data.total || fetchedTransactions.length;

      setTransactions(fetchedTransactions);
      setTotalPages(Math.ceil(totalItems / rowsPerPage));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='container mt-2'>
      <h3 className='center-text'>Showing data for the Month = {selectedMonth}</h3>
      <Table striped hover bordered className="mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={transaction._id}>
                <td>{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                <td>{transaction.title}</td>
                <td style={{ maxWidth: '450px' }}>{transaction.description}</td>
                <td>{transaction.price}</td>
                <td>{transaction.category}</td>
                <td>{transaction.sold ? 'Sold' : 'Not Sold'}</td>
                <td>
                  {transaction.image ? (
                    <img src={transaction.image} alt={transaction.title} style={{ width: '100px' }} />
                  ) : 'No Image'}
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="7" className="text-center">No Transactions Found</td></tr>
          )}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} />
      </Pagination>
    </div>
  );
};

export default TransactionsTable;
