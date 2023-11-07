import React, { useState, useEffect } from 'react';
import {
    Button, MenuItem,
    Card, Select, TextField,
    CardContent, DialogActions,
    Modal, FormControl, InputLabel
} from "@mui/material";

// const [subcategoriesGoods, setSubcategoriesGoods] = useState([]);
// const [selectedSubcategory, setSelectedSubcategory] = useState(''); // Для обраної підкатегорії

const SubcategoryCategoryEditModal = ({
    appointSubcategoryCategoryModalOpen, setAppointSubcategoryCategoryModalOpen,
    editedSubcategoryCategory, setEditedSubcategoryCategory, subcategoryName, 
    handleSaveSubcategoryCategory// Отримуємо функцію з пропс
}) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/categoriesGoods')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.log(error));
    }, []);

    const handleClick = (e) => {
        e.preventDefault();

        if (!editedSubcategoryCategory) {
            alert('Будь ласка, виберіть Підкатегорію');
            // setOpenDialog(true); // Відкриваємо діалогове вікно, якщо поля не заповнені
            return;
        }
        else {
            handleSaveSubcategoryCategory()
        }
    };

    return <>

        <Modal
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: "50000",
            }}
            open={appointSubcategoryCategoryModalOpen}
            onClose={() => { setAppointSubcategoryCategoryModalOpen(false); }}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Card
                style={{
                    minWidth: "400px",
                    // minHeight: "600px",
                    padding: "10px"
                }}
            >
                <CardContent
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",                        
                    }}
                >
                    <TextField
                        label="Товар"
                        value={subcategoryName}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                          }}
                    />

                    <FormControl required sx={{ width: '100%' }}>
                        <InputLabel id="category-label">Змініть категорію</InputLabel>
                        <Select
                            label="Змініть категорію"
                            labelId="category-label"
                            id="category-select"
                            value={editedSubcategoryCategory}
                            onChange={(e) => setEditedSubcategoryCategory(e.target.value)}
                            MenuProps={{
                                disablePortal: true, // <--- HERE
                                onClick: e => {
                                  e.preventDefault();
                                }
                              }}
                        >
                            {categories.map(category => (
                                <MenuItem sx={{ zIndex: 150000, 
                                    position: "relative",  }} key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </CardContent>
                <DialogActions>
                    <Button variant="outlined" color="error" onClick={() => setAppointSubcategoryCategoryModalOpen(false)}>Скасувати</Button>
                    <Button variant="outlined" onClick={handleClick}>Зберегти</Button>
                </DialogActions>
            </Card>
        </Modal>
    </>;

};

export default SubcategoryCategoryEditModal
