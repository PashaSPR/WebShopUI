import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import MessageEmptyFieldModal from '../modal/MessageEmptyFieldModal';


export default function AddCategoriesComponent() {
    const [name, setName] = useState(''); // Створюємо стан для збереження імені властивості
    const [openDialog, setOpenDialog] = useState(false); // Стан для відображення діалогового вікна
    const [dialogText, setDialogText] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();

        if (!name) {
            setDialogText('Будь ласка, заповніть поле "Назва категорії"')
            setOpenDialog(true); // Відкриваємо діалогове вікно, якщо поля не заповнені
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/categoriesGoods', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }), // Використовуємо стан name
            });

            if (response.ok) {
                const data = await response.json();
                console.log('New Category added');
                console.log('Category ID:', data.id); // Рядок для перевірки
                setName(''); // Очищуємо поле name
            } else {
                console.error('Failed to add Category');
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
            <h1>Додати категорію</h1>
            <form noValidate autoComplete="off" style={{ paddingTop: '20px' }} >

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
                    <TextField
                        required
                        label="Назва категорії"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Використовуємо setName для оновлення стану
                        sx={{ width: '100%' }}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" color="success" onClick={handleClick} style={{ height: '55px' }}>
                                Зберегти категорію
                            </Button>
                        </Grid>
                    </Grid>


                </Box>

            </form>
            <MessageEmptyFieldModal open={openDialog} onClose={handleCloseDialog} dialogText={dialogText} />

        </div>
    );
}