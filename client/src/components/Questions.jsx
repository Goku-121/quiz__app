import React from 'react';
import '../styles/questions.css';
import '../styles/quiz.css';

export default function Questions({ question, onChecked, selectedAnswer, showAnswers = false, index }) {
  if (!question) return null;

  return (
    <div className='questions'>
      <h2 className='text-light'>{question.question}</h2>

      <ul key={question._id}>
        {question.options.map((option, i) => {
          let optionClass = '';

          if (showAnswers) {
            const isCorrect = question.correctAnswer === i;
            const isSelected = selectedAnswer === i;

            if (isCorrect) optionClass = 'correct';  // green
            else if (isSelected && !isCorrect) optionClass = 'wrong';  // red
          } else if (selectedAnswer !== undefined) {
            if (selectedAnswer === i) {
              optionClass = (selectedAnswer === question.correctAnswer) ? 'correct' : 'wrong';
            }
          }

          return (
            <li key={i} className={optionClass}>
              <input
                type="radio"
                name={`question-${index}`}
                id={`q${i}-option`}
                checked={selectedAnswer === i}
                onChange={() => onChecked(i)}
                disabled={showAnswers || selectedAnswer !== undefined}
              />
              <label className='text-primary' htmlFor={`q${i}-option`}>{option}</label>
              <div className={`check ${selectedAnswer === i ? 'checked' : ''}`}></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
