import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Rating } from '@mui/material';
import axios from 'axios';

function AddEvaluationDialogComponent({ productId }) {
    const [open, setOpen] = useState(false);
    const [evaluation, setEvaluation] = useState(0);
    const [isGoodPurchased, setIsGoodPurchased] = useState(false);
    const [customerID, setCustomerID] = useState(2); // Замініть на реальний ID користувача

    // const handleOpen = () => {
    //   console.log('CustomerId  ' + customerID);
    //   console.log('ProductId  ' + productId);

    //   const requestData = {
    //     customerId: customerID,
    //     goodsId: productId,
    //     evaluation: evaluation,
    //   };

    //      axios.get('http://localhost:8080/evaluations/isGoodPurchased', requestData)
    //     .then(response => {
    //       console.log('Перевірка пройдена', response.data);
    //       setIsGoodPurchased(true);
    //     })
    //     .catch(error => {
    //       console.error('Помилка перевірки', error);
    //     });
    //   setOpen(true);
    // };


    const handleOpen = () => {
        console.log('CustomerId  ' + customerID);
        console.log('ProductId  ' + productId);

        const requestData = {
            customerId: customerID,
            goodsId: productId,
            evaluation: evaluation,
        };

        axios.get('http://localhost:8080/evaluations/isGoodPurchased', {
            params: requestData
        })
            .then(response => {
                console.log('Перевірка пройдена', response.data);
                setIsGoodPurchased(true);
            })
            .catch(error => {
                console.error('Помилка перевірки', error);
                setIsGoodPurchased(false); // Налаштовуємо isGoodPurchased на `false`, оскільки перевірка не вдалася
            });

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSaveEvaluation = () => {

        const requestData = {
            customerId: customerID,
            goodsId: productId,
            evaluation: evaluation,


        };



        fetch('http://localhost:8080/evaluations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Змінити Content-Type
            },
            body: JSON.stringify(requestData), // Перетворюємо дані в JSON
        })
            .then((response) => response.json())
            .then((data) => {
                // Обробляємо відповідь від сервера, наприклад, виводимо повідомлення про успішне додавання
                console.log('Оцінку успішно додано:', data);
                // Очищаємо поля вводу кількості та ціни
                // Закриваємо діалогове вікно
                // this.closeDialog();
            })
            .catch((error) => {
                // Обробляємо помилку від сервера, наприклад, виводимо повідомлення про помилку
                console.error('Помилка при додаванні оцінки товару:', error);
            });





        // axios.post('http://localhost:8080/evaluations', requestData, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         // Додайте інші заголовки, якщо необхідно
        //     },
        //     // ...requestOptions, // Додаємо інші параметри запиту (необов'язково)
        // })
        //     .then(response => {
        //         console.log('Збереження оцінки:', response.data);
        //     })
        //     .catch(error => {
        //         console.error('Помилка при збереженні оцінки:', error);
        //         if (error.response) {
        //             console.log('Відповідь сервера:', error.response.data);
        //         }
        //     });








        handleClose();
    };


    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>
                Додати оцінку
            </Button>
            <Dialog open={open} onClose={handleClose}>
                {isGoodPurchased ? (
                    <div>
                        <DialogTitle>Додати оцінку</DialogTitle>
                        <DialogContent>
                            <Rating
                                value={evaluation}
                                onChange={(event, newValue) => setEvaluation(newValue)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Закрити
                            </Button>
                            <Button onClick={handleSaveEvaluation} color="primary">
                                Зберегти
                            </Button>
                        </DialogActions>
                    </div>
                ) :
                    <div>
                        <DialogTitle>Ви не можете оцінювати даний товар, тому що Ви його не купували!</DialogTitle>
                        <DialogContent>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Закрити
                            </Button>
                            {/* <Button onClick={handleSaveEvaluation} color="primary">
          Зберегти
        </Button> */}
                        </DialogActions>
                    </div>
                }
            </Dialog>
        </div>
    );
}

export default AddEvaluationDialogComponent;