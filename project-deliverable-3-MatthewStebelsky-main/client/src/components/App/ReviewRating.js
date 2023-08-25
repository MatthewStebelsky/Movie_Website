import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const ReviewRating = ({ value, onChange, showError, clearFields }) => {
  const [localValue, setLocalValue] = useState('');

  useEffect(() => {
    if (clearFields) {
      setLocalValue('');
    }
  }, [clearFields]);

  const handleRatingChange = (event) => {
    setLocalValue(event.target.value);
    onChange(event.target.value);
    showError(false);
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Rate the Movie</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleRatingChange}
        value={localValue}
      >
        <FormControlLabel value="1" control={<Radio />} label="1 star" labelPlacement="bottom" />
        <FormControlLabel value="2" control={<Radio />} label="2 star" labelPlacement="bottom" />
        <FormControlLabel value="3" control={<Radio />} label="3 star" labelPlacement="bottom" />
        <FormControlLabel value="4" control={<Radio />} label="4 star" labelPlacement="bottom" />
        <FormControlLabel value="5" control={<Radio />} label="5 star" labelPlacement="bottom" />
      </RadioGroup>
    </FormControl>
  );
};

export default ReviewRating;