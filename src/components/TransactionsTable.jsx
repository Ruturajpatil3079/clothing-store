import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const TransactionsTable = ({ selectedMonth, searchText }) => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [expandedRows, setExpandedRows] = useState({}); // Track expanded rows

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, searchText]);

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, searchText, currentPage]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/transactions", {
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
      console.error("Error fetching data:", error);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const toggleRowExpansion = (id) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const truncateDescription = (description, isExpanded) => {
    if (isExpanded) return description; // Show full description if expanded
    const maxLines = 5;
    const lines = description.split("\n").slice(0, maxLines); // Limit to 5 lines
    return lines.join("\n") + (description.split("\n").length > maxLines ? " ..." : "");
  };

  return (
    <div className="container mt-2">
      <h2 className="text-center">Showing data for the Month = {selectedMonth}</h2>
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
            transactions.map((transaction, index) => {
              const isExpanded = expandedRows[transaction._id] || false;
              return (
                <tr key={transaction._id}>
                  <td>{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                  <td>{transaction.title}</td>
                  <td style={{ maxWidth: "450px", whiteSpace: "pre-line" }}>
                    {truncateDescription(transaction.description, isExpanded)}
                    {transaction.description.split("\n").length > 5 && (
                      <span
                        style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
                        onClick={() => toggleRowExpansion(transaction._id)}
                      >
                        {isExpanded ? " Show less" : " Read more"}
                      </span>
                    )}
                  </td>
                  <td>{transaction.price}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.sold ? "Sold" : "Not Sold"}</td>
                  <td>
                    {transaction.image ? (
                      <img
                        src={transaction.image}
                        alt={transaction.title}
                        style={{ width: "100px" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No Transactions Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Row className="align-items-center mb-4">
        <Col md={4} className="text-center">
          <span>Page No: {currentPage}</span>
        </Col>
        <Col md={4} className="text-center">
          <Button onClick={handlePrevious} disabled={currentPage === 1} className="mx-2">
            Previous
          </Button>
          <span className="align-self-center">
            Page {currentPage} of {totalPages}
          </span>
          <Button onClick={handleNext} disabled={currentPage === totalPages} className="mx-2">
            Next
          </Button>
        </Col>
        <Col md={4} className="text-center">
          <span>Per page: {rowsPerPage}</span></Col>
      </Row>
    </div>
  );
};

export default TransactionsTable;
