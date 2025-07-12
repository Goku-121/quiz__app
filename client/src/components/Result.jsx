import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/result.css';

export default function Result() {
  const location = useLocation();
  const { result, questions, userId } = location.state || {};
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!result || !questions || !userId) return;

    const correctAnswers = questions.map((q, i) => q.correctAnswer === result[i]);
    const totalPoints = correctAnswers.filter(Boolean).length * 10;
    setScore(totalPoints);

    const resultData = {
      username: userId,
      points: totalPoints,
      attempts: result.length,
      achieved: totalPoints >= 50 ? "Passed" : "Failed",
      answers: result,
    };

    axios.post('http://localhost:5000/api/results', resultData)
      .then(res => console.log('Result saved:', res.data))
      .catch(err => console.error('Failed to save result', err));
  }, [result, questions, userId]);

  if (!result || !questions) {
    return <h3>Result data not found!</h3>;
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Result</h1>
      <div className="result-details">
        <p><strong>Username:</strong> {userId}</p>
        <p><strong>Total Questions:</strong> {questions.length}</p>
        <p><strong>Attempts:</strong> {result.length}</p>
        <p><strong>Score:</strong> {score}</p>
        <p><strong>Status:</strong> {score >= 50 ? "Passed" : "Failed"}</p>
      </div>
      <div className="start">
        <Link className="btn" to="/">Start Again</Link>
        <Link className="btn" to="/history">View Result History</Link>
      </div>
    </div>
  );
}
