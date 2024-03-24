
import React, { useState, useEffect } from 'react';
import ButtonAppBar from './Appbar.js';

import './Question.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function QuestionForm() {
  // const navigate = useNavigate(); // Use useNavigate hook

  const [question, setQuestion] = useState('');
  const [cardList, setCardList] = useState([]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = () => {
    // Sending POST request to the backend
    fetch('https://errorsback.vercel.app/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question })
    })
    .then(response => response.json())
    .then(data => {
      
      // Update cardList state with the new question
      setCardList([...cardList, data]); // Assuming data contains the new question object
      // Clear the textarea after submitting
      setQuestion('');
      // Navigate to the root page after submitting
      // navigate("/");
    })
    .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    // Fetch cardList after the component mounts
    fetch('https://errorsback.vercel.app/getmany', { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        
        setCardList(data); // Update cardList state
      })
      .catch(error => console.error('Error fetching card list:', error));
  }, [cardList]); // Empty dependency array ensures this effect runs only once after mounting
 
  const navigate=useNavigate();
  return (
    <>
      <ButtonAppBar />
      <div className="whole">
      <div className="question">
        <textarea
          value={question}
          onChange={handleQuestionChange}
          placeholder="Enter your question here..."
          className='textarea'
        />
        <button onClick={handleSubmit} className='button'>
          Add Question
        </button>
      </div>
      <br />
      <div className="card-container" style={{  }}>
        {cardList.map((card, index) => (
          <div className="card" key={card._id} style={{ }} onClick={()=>{navigate(`/detials/${card._id}`)}}>
            <h3>Question {index + 1}</h3>
            <p>{card.question}</p>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}

export default QuestionForm;
