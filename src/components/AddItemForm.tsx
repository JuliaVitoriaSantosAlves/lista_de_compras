import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface AddItemFormProps {
  onAddItem: (name: string, category: string) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && category) {
      onAddItem(name, category);
      setName('');
      setCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', mt: 2 }}>
        <TextField
          label="Item"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Categoria"
          variant="outlined"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          Adicionard Item
        </Button>
      </Box>
    </form>
  );
};

export default AddItemForm;