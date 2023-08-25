import React, { useEffect, useState } from 'react';
import ReviewTitle from '../App/ReviewTitle';
import ReviewBody from '../App/ReviewBody';
import ReviewRating from '../App/ReviewRating';
import MovieSelection from '../App/MovieSelection';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { array } from 'prop-types';

 
const Review = () => {
    const [user, setUser] = useState(1);
    const [showMovieError, setShowMovieError] = useState(false);
    const [showTitleError, setShowTitleError] = useState(false);
    const [showBodyError, setShowBodyError] = useState(false);
    const [showRatingError, setShowRatingError] = useState(false);
    const [showReviewRecieved, setShowReviewRecieved] = useState(false);
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState([]);
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewBody, setReviewBody] = useState('');
    const [selectedRating, setSelectedRating] = useState(null);
    const [prevSelectedMovie, setPrevSelectedMovie] = useState([]);
    const [prevReviewTitle, setPrevReviewTitle] = useState('');
    const [prevReviewBody, setPrevReviewBody] = useState('');
    const [prevSelectedRating, setPrevSelectedRating] = useState(null);
    const [clearFields, setClearFields] = useState(false);
  
    const serverURL = "";
    React.useEffect(() =>{
      loadMovies();
    }, []);
  
    const handleValidation = () => {
      setShowMovieError(false);
      setShowTitleError(false);
      setShowBodyError(false);
      setShowRatingError(false);
  
  
      if (selectedMovie.length === 0) {
        setShowMovieError(true);
      }
  
  
      if (reviewTitle.trim() === '') {
        setShowTitleError(true);
      }
  
  
      if (reviewBody.trim() === '') {
        setShowBodyError(true);
      }
  
  
      if (!selectedRating) {
        setShowRatingError(true);
      }
  
      if (selectedMovie && reviewTitle && reviewBody && selectedRating){
        setShowReviewRecieved(true)
        setPrevSelectedMovie(selectedMovie);
        setPrevReviewTitle(reviewTitle); 
        setPrevReviewBody(reviewBody);
        setPrevSelectedRating(selectedRating);
        setSelectedMovie([])
        setReviewTitle("")
        setReviewBody("")
        setSelectedRating(null)
        setClearFields(true)
        submitReview()
      }
    };
  
    useEffect(() => {
      if (clearFields) {
        setSelectedMovie([])
        setReviewTitle("")
        setReviewBody("")
        setSelectedRating(null)
        setClearFields(false);
      }
    }, [clearFields]);
  
  
    const loadMovies = () => {
      fetch('/api/getMovies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.movies);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
  
    const submitReview = async () => {
    const selectedMovieObject = movies.find((movie) => movie.id === selectedMovie);
    const selectedMovieTitle = selectedMovieObject ? selectedMovieObject.name : '';
      
  
    setPrevSelectedMovie(selectedMovieTitle);
      const url = "/api/addReview";
  
      console.log(url);
      let data ={
        reviewTitle: reviewTitle,
        reviewContent: reviewBody,
        reviewScore: selectedRating,
        userID: user,
        movieID: selectedMovie,
      }
      console.log(data)
      console.log("good")
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(data)
      });
        const body = await response.json();
    }
   
  
  return (
    <>
      <h3>Everything Movies: Review a Movie</h3>
      <Box sx={{ width: '100%' }}>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item xs={6}>
            {MovieSelection}
            <MovieSelection value={selectedMovie} movies={movies} onChange={setSelectedMovie} showError={setShowMovieError} clearFields={clearFields}/>
            {showMovieError && <p style={{ color: 'red' }}>Select your movie</p>}
          </Grid>
          <Grid item xs={6}>
            {ReviewTitle}
            <ReviewTitle value= {reviewTitle} onChange={setReviewTitle} showError={setShowTitleError} clearFields={clearFields} />
            {showTitleError && <p style={{ color: 'red' }}>Enter your review title</p>}
          </Grid>
          <Grid item xs={6}>
            {ReviewBody}
            <ReviewBody value= {reviewBody} onChange={setReviewBody} showError={setShowBodyError} clearFields={clearFields} />
            {showBodyError && <p style={{ color: 'red' }}>Enter your review</p>}
          </Grid>
          <Grid item xs={6}>
            {ReviewRating}
            <ReviewRating value= {selectedRating} onChange={setSelectedRating} showError={setShowRatingError} clearFields={clearFields}/>
            {showRatingError && <p style={{ color: 'red' }}>Select the rating</p>}
          </Grid>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={handleValidation}>
              Submit
            </Button>
          </Stack>
          {showReviewRecieved && (
            <Grid item xs={6}>
              <Typography variant="h6" align="center">
                Your review has been received
              </Typography>
              <Paper variant="outlined">
                <Box p={2}>
                  <Typography variant="body1">Movie: {prevSelectedMovie}</Typography>
                  <Typography variant="body1">Title: {prevReviewTitle}</Typography>
                  <Typography variant="body1">Review: {prevReviewBody}</Typography>
                  <Typography variant="body1">Rating: {prevSelectedRating}</Typography>
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};


export default Review;
