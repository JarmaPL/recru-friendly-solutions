import React, { useState, useEffect } from 'react';
import './App.css';

interface WorkOrder {
  work_order_id: number;
  description: string;
  received_date: string;
  assigned_to: [
    {
      person_name: string;
      status: string;
    }
  ];
  status: string;
  priority: string;
}


const App = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [search, setSearch] = useState('');

  const getData = () => {
    fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setFetchedData(data.response.data);
        })
        .catch(() => {
          throw new Error('Something went wrong!!!');
        });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
      <div className="App">
        <div>
          <input
              className="search"
              type="text"
              onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
              placeholder="Search"
          />
        </div>
        <div className="Table">
          <div className="Table-row">
            <span className="Table-row-text Table-row-title">WO ID</span>
            <span className="Table-row-text Table-row-title">Description</span>
            <span className="Table-row-text Table-row-title">Received date</span>
            <span className="Table-row-text Table-row-title">Assigned to</span>
            <span className="Table-row-text Table-row-title">Status</span>
            <span className="Table-row-text Table-row-title">Priority</span>
          </div>
          {fetchedData
              ? fetchedData
                  .filter(
                      (item: WorkOrder) => item.description.toLocaleLowerCase().search(search) !== -1
                  )
                  .map((item: WorkOrder) => (
                      <div className="Table-row" key={item.work_order_id}>
                        <span className="Table-row-text">{item.work_order_id}</span>
                        <span className="Table-row-text">{item.description}</span>
                        <span className="Table-row-text">{item.received_date}</span>
                        <span className="Table-row-text">
                    {item.assigned_to.map(({ person_name }) => person_name).join(', ')}
                  </span>
                        <span
                            className={
                              item.status === 'Confirmed' ? 'Table-row-text' : 'Table-row-text New'
                            }
                        >
                    {item.status}
                  </span>
                        <span className="Table-row-text">{item.priority}</span>
                      </div>
                  ))
              : null}
        </div>
      </div>
  );
}

export default App;
