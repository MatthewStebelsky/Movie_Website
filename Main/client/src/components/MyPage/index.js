import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField, Button } from "@mui/material";

const YoutubeEmbed = ({ embedId }) => {
  return (
    <div className="youtube-embed">
      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${embedId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const MyPage = () => {
  const [movies, setMovies] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("/api/getTrailer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const body = await response.json();
        if (response.status === 200) {
          setMovies(body.express);
        } else {
          throw Error(body.message);
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchMovies();
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/addEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Sending the email in the request body
      });

      const data = await response.json();
      console.log(data);
      // You can handle the response data here if needed
    } catch (error) {
      console.error(error.message);
      // Handle any errors that occurred during the request
    }
  };

  return (
    <div className="MyPage">
      <Typography variant="h4" align="center" gutterBottom>
        Suggested Movie Trailers
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {movies.map((movie, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Typography variant="h6" align="center">
              {movie.name}
            </Typography>
            <YoutubeEmbed embedId={movie.trailer} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" align="center" gutterBottom>
        Enter your email:
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyPage;
