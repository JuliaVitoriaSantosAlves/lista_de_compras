import React, { useState, useEffect } from 'react';
import { Collapse, Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
}

interface ShoppingListProps {
  items: ShoppingItem[];
  onRemoveItem: (id: string) => void;
  onEditItem: (id: string, newName: string, newCategory: string) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ items, onRemoveItem, onEditItem }) => {
  const [visibleItems, setVisibleItems] = useState(items);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ShoppingItem | null>(null);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    setVisibleItems(items);
  }, [items]);

  const handleRemove = (id: string) => {
    const confirmDelete = window.confirm('Você tem certeza de que deseja remover este item? Essa ação é definitiva.');
    if (confirmDelete) {
      setVisibleItems((prev) => prev.filter((item) => item.id !== id));
      setTimeout(() => {
        onRemoveItem(id);
      }, 300);
    }
  };

  const handleEditClick = (item: ShoppingItem) => {
    setCurrentItem(item);
    setNewName(item.name);
    setNewCategory(item.category);
    setEditDialogOpen(true);
  };

  const handleEditConfirm = () => {
    if (currentItem) {
      onEditItem(currentItem.id, newName, newCategory);
      setEditDialogOpen(false);
      setCurrentItem(null);
    }
  };

  return (
    <Box>
      {visibleItems.map((item) => (
        <Collapse key={item.id} in={true} timeout={300}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <span>{item.name} - {item.category}</span>
            <Box>
              <Button variant="contained" color="primary" onClick={() => handleEditClick(item)} sx={{ mr: 1 }}>
                Editar
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleRemove(item.id)}>
                Remover
              </Button>
            </Box>
          </Box>
        </Collapse>
      ))}

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Editar Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Item"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <TextField
            label="Categoria"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEditConfirm} color="secondary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShoppingList;