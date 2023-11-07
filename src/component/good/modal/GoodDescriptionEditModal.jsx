import React, { useState } from 'react';
import {
    Button,
    Card,
    CardContent, DialogActions,
    Modal, TextField
} from "@mui/material";

const GoodDescriptionEditModal = ({
    appointGoodDescriptionModalOpen, setAppointGoodDescriptionModalOpen,
    editedGoodDescription, goodName, setEditedGoodDescription,
    handleSaveGoodDescription, // Отримуємо функцію з пропс
}) => {

    const handleClick = (e) => {
        e.preventDefault();

        if (!editedGoodDescription) {
            alert('Будь ласка, заповніть поле "Короткий опис"');
            // setOpenDialog(true); // Відкриваємо діалогове вікно, якщо поля не заповнені
            return;
        }
        else {
            handleSaveGoodDescription()
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
            open={appointGoodDescriptionModalOpen}
            onClose={() => { setAppointGoodDescriptionModalOpen(false); }}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Card
                style={{
                    minWidth: "600px",
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
                        label="Товар"
                        value={goodName}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        label="Змініть опис Товару"
                        multiline
                        rows={4}
                        value={editedGoodDescription}
                        onChange={(e) => setEditedGoodDescription(e.target.value)}
                        fullWidth
                    />

                </CardContent>
                <DialogActions>
                    <Button variant="outlined" color="error" onClick={() => setAppointGoodDescriptionModalOpen(false)}>Скасувати</Button>
                    <Button variant="outlined" onClick={handleClick}>Зберегти</Button>
                </DialogActions>
            </Card>

        </Modal>

    </>;

};

export default GoodDescriptionEditModal
