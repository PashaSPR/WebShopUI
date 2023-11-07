import React from 'react'
import {
    Button,
    Card,
    CardContent, DialogActions,
    Modal, TextField
} from "@mui/material";

const SubcategoryNameEditModal = ({
    appointSubcategoryNameModalOpen, setAppointSubcategoryNameModalOpen,
    editedSubcategoryName, setEditedSubcategoryName,
    handleSaveSubcategoryName, // Отримуємо функцію з пропс
}) => {
    
    const handleClick = (e) => {
        e.preventDefault();

        if (!editedSubcategoryName) {
            alert('Будь ласка, заповніть поле "Змініть назву Категорії"');
            // setOpenDialog(true); // Відкриваємо діалогове вікно, якщо поля не заповнені
            return;
        }
        else {
            handleSaveSubcategoryName()
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
            open={appointSubcategoryNameModalOpen}
            onClose={() => { setAppointSubcategoryNameModalOpen(false); }}
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
                        value={editedSubcategoryName}
                        onChange={(e) => setEditedSubcategoryName(e.target.value)}
                        fullWidth
                    />
                    
                </CardContent>
                <DialogActions>
                        <Button variant="outlined" color="error" onClick={() => setAppointSubcategoryNameModalOpen(false)}>Скасувати</Button>
                        <Button variant="outlined" onClick={handleClick}>Зберегти</Button>
                    </DialogActions>
            </Card>
        </Modal>
    </>;

};

export default SubcategoryNameEditModal
