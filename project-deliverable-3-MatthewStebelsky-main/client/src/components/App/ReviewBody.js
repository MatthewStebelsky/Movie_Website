import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

const ReviewBody = ({ value, onChange, showError, clearFields }) => {
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
      id="standard-textarea"
      label="Type Review"
      placeholder="Review"
      multiline
      variant="standard"
      onChange={handleInputChange}
      value={localValue}
      fullWidth
    />
  );
};

export default ReviewBody;