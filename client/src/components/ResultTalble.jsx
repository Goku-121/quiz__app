import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // <-- import this
import '../styles/resulttable.css';

export default function ResultTable() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();  // <-- initialize navigate

  const fetchResults = () => {
    axios.get('http://localhost:5000/api/results')
      .then(res => setData(res.data))
      .catch(err => console.error('Failed to load results', err));
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/results/${id}`);
      fetchResults();
    } catch (error) {
      console.error('Failed to delete result', error);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all results?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/results`);
      fetchResults();
    } catch (error) {
      console.error('Failed to delete all results', error);
    }
  };

  // New handler to navigate back to start page
  const handleRestart = () => {
    navigate('/');  // navigate to home
  };

  return (
    <div className="container">
      <h1 className="title text-light">Result History</h1>

      <button className="btn delete-all-btn" onClick={handleDeleteAll}>Delete All</button>

      {/* New Restart Button */}
      <button className="btn restart-btn" onClick={handleRestart}> Restart</button>

      <table>
        <thead className='table-header'>
          <tr className='table-row'>
            <td>Name</td>
            <td>Attempts</td>
            <td>Earn Points</td>
            <td>Result</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {(!data || data.length === 0) ? (
            <tr><td colSpan={5}>No Data Found</td></tr>
          ) : (
            data.map((v) => (
              <tr className='table-body' key={v._id}>
                <td>{v.username}</td>
                <td>{v.attempts}</td>
                <td>{v.points}</td>
                <td>{v.achieved}</td>
                <td>
                  <button className="btn delete-btn" onClick={() => handleDelete(v._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
