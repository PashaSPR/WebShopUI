import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import MessageEmptyFieldModal from '../modal/MessageEmptyFieldModal';

const Addgood = () => {
  const [name, setName] = useState('');
  const [shortDiscription, setShortDiscription] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false); // Стан для відображення діалогового вікна
  const [dialogText, setDialogText] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/subcategoriesGoods')
      .then(response => response.json())
      .then(data => setSubcategories(data))
      .catch(error => console.log(error));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

    if (!name) {
      setDialogText('Будь ласка, заповніть поле "Назва товару"')
      setOpenDialog(true); // Відкриваємо діалогове вікно, якщо поля не заповнені
      return;
    }

    if (!shortDiscription) {
      setDialogText('Будь ласка, заповніть поле "Короткий опис"');
      setOpenDialog(true); // Відкриваємо діалогове вікно, якщо поля не заповнені
      return;
    }

    if (!subcategoryId) {
      setDialogText('Будь ласка, виберіть Підкатегорію');
      setOpenDialog(true); // Відкриваємо діалогове вікно, якщо поля не заповнені
      return;
    }


    const good = { name, short_discription: shortDiscription, subcategoryId };
    console.log(good);
    fetch('http://localhost:8080/goods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(good),
    })
      .then(response => response.json())
      .then(data => {
        console.log('New good added');
        console.log('Good ID:', data.id); // Рядок для перевірки
        // Перехід на сторінку додавання зображення товару з ідентифікатором нового доданого товару
        navigate(`/manager/add-photo/${data.id}`);
      })
      .catch(error => console.log(error));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Закриваємо діалогове вікно при натисканні кнопки "OK"
  };

  return (
    <div style={{ marginLeft: '5px' }}>
      <h1>Додати товар</h1>
      <form noValidate autoComplete="off" style={{ paddingTop: '20px' }}>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px' }}>
          <TextField
            required={true}
            label="Назва товару"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: '100%' }} // Встановлюємо ширину поля
          />
          <TextField
            required={true}
            label="Короткий опис"
            multiline
            rows={4}
            value={shortDiscription}
            onChange={(e) => setShortDiscription(e.target.value)}
            sx={{ width: '100%' }} // Встановлюємо ширину поля
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl required sx={{ width: '100%' }}>
                <InputLabel id="subcategory-label">Підкатегорія</InputLabel>
                <Select
                  required={true}
                  label="Підкатегорія"
                  labelId="subcategory-label"
                  id="subcategory-select"
                  value={subcategoryId}
                  onChange={(e) => setSubcategoryId(e.target.value)}
                  sx={{ width: '100%' }}
                >
                  {subcategories.map(subcategory => (
                    <MenuItem key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="success" onClick={handleClick} style={{ height: '55px' }}>
                Зберегти товар
              </Button>
            </Grid>
          </Grid>

        </Box>

      </form>

      <MessageEmptyFieldModal open={openDialog} onClose={handleCloseDialog} dialogText={dialogText} />

    </div>
  );
};

export default Addgood;

