import React, { useState, useEffect } from 'react';
import ShoppingList from './components/ShoppingList';
import AddItemForm from './components/AddItemForm';
import { v4 as uuidv4 } from 'uuid';
import { Checkbox, FormControlLabel, TextField, Box, Typography, Button, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Define temas claro e escuro
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>(() => {
    const savedItems = localStorage.getItem('shoppingList');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [filters, setFilters] = useState<string[]>(() => {
    const savedFilters = localStorage.getItem('shoppingListFilters');
    return savedFilters ? JSON.parse(savedFilters) : [];
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('shoppingListFilters', JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const addItem = (name: string, category: string) => {
    const normalizedCategory = category.toLowerCase();
    const normalizedName = name.toLowerCase(); 

    const newItem = { id: uuidv4(), name: normalizedName, category: normalizedCategory };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const editItem = (id: string, newName: string, newCategory: string) => {
    const normalizedCategory = newCategory.toLowerCase();
    const normalizedName = newName.toLowerCase();

    setItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, name: normalizedName, category: normalizedCategory } : item
      )
    );
  };

  const toggleFilter = (category: string) => {
    const normalizedCategory = category.toLowerCase();

    setFilters(prevFilters =>
      prevFilters.includes(normalizedCategory)
        ? prevFilters.filter(f => f !== normalizedCategory)
        : [...prevFilters, normalizedCategory]
    );
  };

  const filteredItems = filters.length > 0
    ? items.filter(item => filters.includes(item.category))
    : items;

  const searchedItems = searchTerm
    ? filteredItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : filteredItems;

  const sortedItems = searchedItems.sort((a, b) => a.category.localeCompare(b.category));

  const categoryCounts = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  const handleThemeChange = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Lista de compras', 14, 16);
    const tableData = sortedItems.map(item => [item.name, item.category]);
    doc.autoTable({
      head: [['Nome', 'Categoria']],
      body: tableData,
      startY: 20,
    });
    doc.save('Lista-de-compras.pdf');
  };

  return (
    <ThemeProvider theme={themeMode}>
      <CssBaseline />
      <Box sx={{
        p: 2,
        transition: 'background-color 2s ease, color 2s ease',
        bgcolor: themeMode.palette.background.default,
        color: themeMode.palette.text.primary
      }}>
        <Typography variant="h4" gutterBottom>Lista de Compras</Typography>
        <Button variant="contained" onClick={handleThemeChange}>
          Mudar tema {theme === 'light' ? 'Dark' : 'Light'}
        </Button>
        <Button variant="contained" onClick={exportToPDF} sx={{ ml: 2 }}>
          Baixar PDF
        </Button>

        <AddItemForm onAddItem={addItem} />

        {/* Barra de pesquisa por nome */}
        <TextField
          label="Buscar por nome"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Checkboxes para multi-filtros com contagem de itens */}
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
          {Array.from(new Set(items.map(item => item.category))).map(category => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  checked={filters.includes(category)}
                  onChange={() => toggleFilter(category)}
                />
              }
              label={`${category} (${categoryCounts[category]})`}
            />
          ))}
        </Box>

        <ShoppingList items={sortedItems} onRemoveItem={removeItem} onEditItem={editItem} />
      </Box>
    </ThemeProvider>
  );
};

export default App;