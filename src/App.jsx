import { useState } from 'react';
import Navbar from './components/Navbarcomponent';
import TransactionsTable from './components/TransactionsTable';
import Charts from './components/Charts';
import BarChart from './components/charts/BarChart';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <span>Search Transactions :</span>
            <Form onSubmit={(e) => e.preventDefault()} className="ms-2">
              <Form.Control
                type="search"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                aria-label="Search"
                className="me-2"
              />
            </Form>
          </div>

          <div className="d-flex align-items-center">
            <span>Select Month :</span>
            <Form.Select
              aria-label="Select month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-auto ms-2"
            >
              {[
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ].map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </Form.Select>
          </div>
        </div>
      </div>

      <div className="container mt-3">
        <TransactionsTable selectedMonth={selectedMonth} searchText={searchText} />
        <hr className='mt-5' />
        <div className="row barcharts">
          <h2 className='mt-3 mb-4 '>Transaction Statistics for Analysis</h2>
          <div className="col-md-4">
            <Charts selectedMonth={selectedMonth} />

          </div>
          <div className="col-md-8 mb-5 ">
            <BarChart selectedMonth={selectedMonth} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
