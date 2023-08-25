import { Box, Button, Card, CardContent, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const Search = () => {
  const [formData, setFormData] = useState({
    movieName: "",
    actorName: "",
    directorName: ""
  });

  const [movies, setMovies] = useState([]);

  const serverURL = ""; 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const searchMovies = async () => {
    try {
      const response = await fetch(serverURL + "/api/getSearch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieName: formData.movieName,
          actorFirstName: formData.actorName.split(" ")[0],
          actorLastName: formData.actorName.split(" ")[1] || "",
          directorFirstName: formData.directorName.split(" ")[0],
          directorLastName: formData.directorName.split(" ")[1] || "",
        }),
      });

      const body = await response.json();
      setMovies(body.express);
      if (response.status !== 200) throw Error(body.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 5 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            Movie Search
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="movieName"
                label="Movie Name"
                variant="outlined"
                value={formData.movieName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="actorName"
                label="Actor Name"
                variant="outlined"
                value={formData.actorName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="directorName"
                label="Director Name"
                variant="outlined"
                value={formData.directorName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={searchMovies}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ mt: 5 }}>
        {movies.length > 0 ? (
          <TableContainer component={Card} variant="outlined">
            <CardContent>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Movie Name</TableCell>
                    <TableCell>Director First Name</TableCell>
                    <TableCell>Director Last Name</TableCell>
                    <TableCell>Review Title</TableCell>
                    <TableCell>Review Content</TableCell>
                    <TableCell>Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {movies.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.first_name}</TableCell>
                      <TableCell>{row.last_name}</TableCell>
                      <TableCell>{row.reviewTitle}</TableCell>
                      <TableCell>{row.reviewContent}</TableCell>
                      <TableCell>{row.reviewScore}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </TableContainer>
        ) : (
          <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
            No results found.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Search;
