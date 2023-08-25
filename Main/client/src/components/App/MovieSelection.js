import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MovieSelection = ({ value, movies, selectedMovie, onChange, showError, clearFields }) => {
  const theme = useTheme();
  const [localValue, setLocalValue] = useState('');

  useEffect(() => {
    if (clearFields) {
      setLocalValue('');
    }
  }, [clearFields]);

  useEffect(() => {
    setLocalValue(selectedMovie || '');
  }, [selectedMovie]);

  const handleMovieChange = (event) => {
    setLocalValue(event.target.value);
    onChange(event.target.value);
    showError(false);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Choose Movie</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          onChange={handleMovieChange}
          input={<OutlinedInput label="Movie" />}
          MenuProps={MenuProps}
          value={localValue}
        >
          {movies.map((movie) => (
            <MenuItem key={movie.id} value={movie.id}>
              {movie.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MovieSelection;