import React from 'react'
import {
    Button,
    Card,
    CardContent, DialogActions,
    Modal, TextField
} from "@mui/material";

const CategoryNameEditModal = ({
    appointCategoryNameModalOpen, setAppointCategoryNameModalOpen,
    editedCategoryName, setEditedCategoryName,
    handleSaveCategoryName, // Отримуємо функцію з пропс
}) => {
    
    const handleClick = (e) => {
        e.preventDefault();

        if (!editedCategoryName) {
            alert('Будь ласка, заповніть поле "Змініть назву Підкатегорії"');
            // setOpenDialog(true); // Відкриваємо діалогове вікно, якщо поля не заповнені
            return;
        }
        else {
            handleSaveCategoryName()
        }
    };

    return <>

        <Modal
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: "50000"
            }}
            open={appointCategoryNameModalOpen}
            onClose={() => { setAppointCategoryNameModalOpen(false); }}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Card
                style={{
                    minWidth: "400px",
                    padding: "10px"
                }}
            >
                <CardContent
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px"
                    }}
                >
                    <TextField
                        label="Змініть назву Категорії"
                        value={editedCategoryName}
                        onChange={(e) => setEditedCategoryName(e.target.value)}
                        fullWidth
                    />
                    
                </CardContent>
                <DialogActions>
                        <Button variant="outlined" color="error" onClick={() => setAppointCategoryNameModalOpen(false)}>Скасувати</Button>
                        <Button variant="outlined" onClick={handleClick}>Зберегти</Button>
                    </DialogActions>
            </Card>
        </Modal>
    </>;

};

export default CategoryNameEditModal
