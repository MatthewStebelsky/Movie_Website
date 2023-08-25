import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

const ReviewTitle = ({ value, onChange, showError, clearFields }) => {
  const [localValue, setLocalValue] = useState('');

  useEffect(() => {
    if (clearFields) {
      setLocalValue('');
    }
  }, [clearFields]);

  const handleInputChange = (event) => {
    setLocalValue(event.target.value);
    onChange(event.target.value);
    showError(false);
  };

  return (
    <TextField
      id="outlined-basic"
      label="Review Title"
      variant="outlined"
      onChange={handleInputChange}
      value={localValue}
      fullWidth
    />
  );
};

export default ReviewTitle;