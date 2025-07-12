import React, { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import'../styles/forol.css'
export default function Main() {
  const inputRef = useRef(null);
  const { setUserId } = useContext(UserContext);

  function startQuiz() {
    if (inputRef.current?.value) {
      setUserId(inputRef.current.value);
    } else {
      alert("Please enter your name");
    }
  }

  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>
      
      <ol>
        <li>You will be asked 10 questions one after another.</li>
        <li>10 points is awarded for the correct answer.</li>
        <li>Each question has three options. You can choose only one option.</li>
        <li>You can review and change answers before the quiz finishes.</li>
        <li>The result will be declared at the end of the quiz.</li>
      </ol>

      <form onSubmit={e => e.preventDefault()}>
        <input ref={inputRef} className="userid" type="text" placeholder='Username*' />
      </form>

      <div className='start'>
        <Link className='btn' to={'/quiz'} onClick={startQuiz}>Start Quiz</Link>
        <Link to="/history" className="btn">View Result History</Link>
      </div>
    </div>
  );
}
