import React from 'react'
import {
    Button,
    Card,
    CardContent, DialogActions,
    Modal, TextField
} from "@mui/material";

const GoodNameEditModal = ({
    appointGoodNameModalOpen, setAppointGoodNameModalOpen,
    editedGoodName, setEditedGoodName,
    handleSaveGoodName, // Отримуємо функцію з пропс
}) => {

    const handleClick = (e) => {
        e.preventDefault();

        if (!editedGoodName) {
            alert('Будь ласка, заповніть поле "Назва товару"');
            // setOpenDialog(true); // Відкриваємо діалогове вікно, якщо поля не заповнені
            return;
        }
        else {
            handleSaveGoodName()
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
            open={appointGoodNameModalOpen}
            onClose={() => { setAppointGoodNameModalOpen(false); }}
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
                        label="Змініть назву Товару"
                        value={editedGoodName}
                        onChange={(e) => setEditedGoodName(e.target.value)}
                        fullWidth
                    />
                    
                </CardContent>
                <DialogActions>
                        <Button variant="outlined" color="error" onClick={() => setAppointGoodNameModalOpen(false)}>Скасувати</Button>
                        <Button variant="outlined" onClick={handleClick}>Зберегти</Button>
                    </DialogActions>
            </Card>
        </Modal>
    </>;

};

export default GoodNameEditModal
