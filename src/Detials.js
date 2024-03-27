import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import { useParams } from 'react-router';
import './Question.css'
import { Button } from '@mui/material';

function Details({ question }) {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);

  // Fetch question details when component mounts
  useEffect(() => {
    fetch(`https://errorsback.vercel.app/detials/${id}`)
      .then(response => response.json())
      .then(data => setDetails(data))
      .catch(error => console.error('Error fetching question details:', error));
  }, [id]);

  // Function to fetch updated comments
  const fetchComments = () => {
    fetch(`https://errorsback.vercel.app/detials/${id}`)
      .then(response => response.json())
      .then(data => setComments(data.comments || [])) // Update comments state
      .catch(error => console.error('Error fetching comments:', error));
  };

  useEffect(() => {
    fetchComments(); 
  });
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  const handleAddComment = () => {
    let newComment1=newComment;
    console.log(newComment1);
    setNewComment('');

    if (newComment1.trim() !== '') {
      fetch('https://errorsback.vercel.app/postcomment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionId: id, comment: newComment1 })
      })
        .then(response => response.json())
        .then(() => {
          fetchComments();
        })
        .catch(error => console.error('Error adding comment:', error));
    }
    
  };

  const handleGoBack = () => {
    window.history.back(); 
  };

  return (
    <div c style={{ position: 'relative', minHeight: '90vh' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={handleGoBack} edge="start" color="inherit" aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <h2 style={{ flexGrow: 1 }}>Details</h2>
        </Toolbar>
      </AppBar>
      <div  className='whole' style={{ marginBottom: '100px', marginTop: '64px' }}>
        <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
          <h3>{details.question}</h3>
          <p>{question}</p>
        </div>
        <div>
          {comments.map((comment, index) => (
            <div key={index} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px', whiteSpace: 'pre-line' }}>
              <p style={{ margin: 0 }}>{comment}</p><br></br>
              <Button onClick={()=>{setLike(like+1)}}>👍{like}</Button>
              <Button onClick={()=>{setDislike(dislike+1)}}>👎{dislike}</Button>
            </div>
          ))}
        </div>
        
      </div>
      <div  style={{ position: 'fixed', bottom: '0', left: '0', width: '100%', backgroundColor: '#fff', padding: '10px', borderTop: '1px solid #ccc', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          style={{
            flex: '1',
            height: '60px',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            resize: 'vertical',
          }}
        />
        <IconButton aria-label="add" onClick={handleAddComment}>
          <MapsUgcIcon color='primary' style={{ fontSize: '200%' }} />
        </IconButton>
      </div>
    </div>
  );
}

export default Details;
