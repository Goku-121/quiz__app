import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Questions from './Questions';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import '../styles/progressbar.css';
import '../styles/quiz.css';

export default function Quiz() {
  const [trace, setTrace] = useState(0);
  const [result, setResult] = useState([]);
  const [questionList, setQuestions] = useState([]);
  const { userId } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!userId) {
      alert("Please enter your name first");
      setRedirect(true);
    }
  }, [userId]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.error('Failed to load questions', err));
  }, []);

  if (redirect) {
    return <Navigate to="/" replace={true} />;
  }

  function onChecked(answerIndex) {
    const newResult = [...result];
    newResult[trace] = answerIndex;
    setResult(newResult);
  }

  function onNext() {
    if (result[trace] === undefined) {
      alert("Please select an option before moving next");
      return;
    }
    if (trace < questionList.length - 1) setTrace(trace + 1);
  }

  function onPrev() {
    if (trace > 0) setTrace(trace - 1);
  }

  if (questionList.length > 0 && result.length === questionList.length) {
    return <Navigate to="/result" replace={true} state={{ result, questions: questionList, userId }} />;
  }

  if (questionList.length === 0) return <h3 className="text-light">Loading...</h3>;

  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>

      <div className='progress-bar'>
        <div 
          className='progress' 
          style={{ width: `${((trace + 1) / questionList.length) * 100}%` }}
        ></div>
      </div>

      <Questions
        question={questionList[trace]}
        onChecked={onChecked}
        selectedAnswer={result[trace]}
        index={trace}
      />

      <div className='grid'>
        {trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div />}
        <button 
          className='btn next' 
          onClick={onNext} 
          disabled={result[trace] === undefined}
        >
          Next
        </button>
      </div>
    </div>
  );
}
