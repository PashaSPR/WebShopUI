import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid } from '@mui/material';
import MessageEmptyFieldModal from '../modal/MessageEmptyFieldModal';

export default function AddSubcategoriesComponent() {
    const [name, setName] = useState('');
    const [categoriesGoodsId, setCategoriesGoodsId] = useState('');
    const [categoriesGoods, setCategoriesGoods] = useState([]);
    const [openDialog, setOpenDialog] = useState(false); // Стан для відображення діалогового вікна
    const [dialogText, setDialogText] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/categoriesGoods')
            .then(response => response.json())
            .then(data => setCategoriesGoods(data))
            .catch(error => console.log(error));
    }, []);

    const handleClick = async (e) => {
        e.preventDefault();

        if (!name) {
            setDialogText('Будь ласка, заповніть поле "Назва підкатегорії"')
            setOpenDialog(true); // Відкриваємо діалогове вікно, якщо поля не заповнені
            return;
        }


        if (!categoriesGoodsId) {
            setDialogText('Будь ласка, виберіть Категорію')
            setOpenDialog(true); // Відкриваємо діалогове вікно, якщо поля не заповнені
            return;
        }

        const subcategory = {
            name,
            categoriesGoodsId: parseInt(categoriesGoodsId)
        };


        // const subcategory = { name, categoriesGoodsId };
        try {
            const response = await fetch('http://localhost:8080/subcategoriesGoods', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(subcategory),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('New Subcategory added');
                console.log('Subcategory ID:', data.id);
                setName('');
            } else {
                console.error('Failed to add Subcategory');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Закриваємо діалогове вікно при натисканні кнопки "OK"
    };

    return (
        <div>
            <h1>Додати Підкатегорію</h1>
            <form noValidate autoComplete="off" style={{ paddingTop: '20px' }} >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
                    <TextField
                        required
                        label="Назва підкатегорії"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ width: '100%' }}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>

                            <FormControl required sx={{ width: '100%' }}>
                                <InputLabel id="category-label">Категорія</InputLabel>
                                <Select
                                    label="Категорія"
                                    labelId="category-label"
                                    id="category-select"
                                    value={categoriesGoodsId}
                                    onChange={(e) => setCategoriesGoodsId(e.target.value)}
                                    sx={{ width: '100%' }}
                                >
                                    {categoriesGoods.map(category => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" color="success" onClick={handleClick} style={{ height: '55px' }}>
                                Зберегти підкатегорію
                            </Button>
                        </Grid>
                    </Grid>

                </Box>
            </form>

            {/* Діалогове вікно */}
            {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Повідомлення</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogText}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog> */}
            <MessageEmptyFieldModal open={openDialog} onClose={handleCloseDialog} dialogText={dialogText} />

        </div>
    );
}


// import React, { useState } from 'react';
// import AddSubcategoryForm from './Navmenu';

// const AddSubcategoryPage = () => {
//   const handleAddSubcategory = (subcategory) => {
//     // Виконати POST-запит на сервер за допомогою fetch або іншої бібліотеки
//     fetch('http://localhost:8080/subcategoriesGoods', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(subcategory)
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Новий subcategory:', data);
//       // Можливо, оновити стан або зробити інші дії
//     })
//     .catch(error => {
//       console.error('Помилка при додаванні subcategory:', error);
//     });
//   };

//   return (
//     <div>
//       <h1>Додати subcategory</h1>
//       <AddSubcategoryForm onAddSubcategory={handleAddSubcategory} />
//     </div>
//   );
// };

// export default AddSubcategoryPage;
