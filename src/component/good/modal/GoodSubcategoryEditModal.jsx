import React, { useState, useEffect } from 'react';
import {
    Button, MenuItem,
    Card, Select, TextField,
    CardContent, DialogActions,
    Modal, FormControl, InputLabel
} from "@mui/material";

// const [subcategoriesGoods, setSubcategoriesGoods] = useState([]);
// const [selectedSubcategory, setSelectedSubcategory] = useState(''); // Для обраної підкатегорії

const GoodSubcategoryEditModal = ({
    appointGoodSubcategoryModalOpen, setAppointGoodSubcategoryModalOpen,
    editedGoodSubcategory, setEditedGoodSubcategory, goodName,
    handleSaveGoodSubcategory// Отримуємо функцію з пропс
}) => {

    const [subcategories, setSubcategories] = useState([]);
    // const [subcategoryId, setSubcategoryId] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/subcategoriesGoods')
            .then(response => response.json())
            .then(data => setSubcategories(data))
            .catch(error => console.log(error));
    }, []);

    return <>

        <Modal
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: "50000",
            }}
            open={appointGoodSubcategoryModalOpen}
            onClose={() => { setAppointGoodSubcategoryModalOpen(false); }}
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
                        value={goodName}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                          }}
                    />

                    <FormControl required sx={{ width: '100%' }}>
                        <InputLabel id="subcategory-label">Змініть підкатегорію Товару</InputLabel>
                        <Select
                            label="Змініть підкатегорію Товару"
                            labelId="subcategory-label"
                            id="subcategory-select"
                            value={editedGoodSubcategory}
                            onChange={(e) => setEditedGoodSubcategory(e.target.value)}
                            MenuProps={{
                                disablePortal: true, // <--- HERE
                                onClick: e => {
                                  e.preventDefault();
                                }
                              }}
                        >
                            {subcategories.map(subcategory => (
                                <MenuItem sx={{ zIndex: 150000, 
                                    position: "relative",  }} key={subcategory.id} value={subcategory.id}>
                                    {subcategory.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </CardContent>
                <DialogActions>
                    <Button variant="outlined" color="error" onClick={() => setAppointGoodSubcategoryModalOpen(false)}>Скасувати</Button>
                    <Button variant="outlined" onClick={handleSaveGoodSubcategory}>Зберегти</Button>
                </DialogActions>
            </Card>
        </Modal>
    </>;

};

export default GoodSubcategoryEditModal
