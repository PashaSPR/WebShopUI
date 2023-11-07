import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button, MenuItem,
    Card, Select, TextField,
    CardContent, DialogActions,
    Modal, FormControl, InputLabel
} from "@mui/material";
import { Link } from 'react-router-dom';

const CartModal = ({
    call, onDestroy
}) => {
    const [goodsOrders, setGoodsOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/goodsOrders`)
            .then(response => setGoodsOrders(response.data))
            .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        // Викликаємо метод reduce для розрахунку загальної суми усіх товарів
        const total = goodsOrders.reduce((accumulator, currentOrder) => {
            const price = currentOrder.price;
            const quantity = currentOrder.quantity;
            return accumulator + price * quantity;
        }, 0); // Початкове значення accumulator - 0

        setTotalPrice(total);
    }, [goodsOrders]);
    console.log(goodsOrders);

    const handleDelete = async (id) => {
        try {
            // Виконати DELETE-запит на відповідний URL
            await axios.delete(`http://localhost:8080/goodsOrders/${id}`);

            // Оновити стан товарів після видалення
            const updatedGoodsOrders = goodsOrders.filter(order => order.id !== id);
            setGoodsOrders(updatedGoodsOrders);
        } catch (error) {
            console.error('Помилка під час видалення товару:', error);
        }
    }


    if (!call) {
        return null;
    }

    return (
        <Modal
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: "50000",
            }}
            open={call}
            onClose={onDestroy}
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
                        gap: "15px",
                    }}
                >
                    <h1>Кошик</h1>
                    <hr />

                    <div className="btns">
                        <div className='scroll-container'>
                            {goodsOrders.map(goodsOrder => (
                                <div key={goodsOrder.id}>
                                    <table>
                                        <tr>
                                            <td><h3>{goodsOrder.goodsInvoicesDTO.goods.name}</h3></td>
                                            
                                            <td>
                                                <button onClick={() => handleDelete(goodsOrder.id)}>Видалити</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td  >
                                                {goodsOrder.goodsInvoicesDTO.goods.photosGoodsDTOS && goodsOrder.goodsInvoicesDTO.goods.photosGoodsDTOS.length > 0 ? (
                                                    <img
                                                        style={{ width: '20%' }}
                                                        src={goodsOrder.goodsInvoicesDTO.goods.photosGoodsDTOS[0].path}
                                                        alt={goodsOrder.goodsInvoicesDTO.goods.photosGoodsDTOS[0].discription}
                                                        onError={(e) => {
                                                            e.target.src = "https://image-thumbs.shafastatic.net/807950839_310_430";
                                                        }}
                                                    />
                                                ) : (
                                                    <img src="https://image-thumbs.shafastatic.net/807950839_310_430" alt="Дефолтне фото" />
                                                )}
                                            </td>
                                            <td>
                                                <tfoot>
                                                    <td>
                                                        <td><h3>Кількість: </h3>
                                                            <h3>Вартість:</h3>
                                                            <h3>Сума: </h3>
                                                        </td>
                                                    </td>
                                                    <td>
                                                        <input type='number' id='number' min={1} defaultValue={goodsOrder ? goodsOrder.quantity : 1}></input>
                                                        <input type='text' id='number' value={goodsOrder.price} readOnly />
                                                        <td><span readOnly>{goodsOrder ? Math.floor(goodsOrder.price * goodsOrder.quantity * 100) / 100 : 'Недоступно'}</span></td>
                                                    </td>
                                                </tfoot>
                                                <Button
                                                    onClick={onDestroy}
                                                    variant="outlined"
                                                    component={Link} to={`/good/${goodsOrder.goodsInvoicesDTO.id}`}
                                                >
                                                    Переглянути товар
                                                </Button>
                                                <Link to={`/good/${goodsOrder.goodsInvoicesDTO.id}`}><Button onClick={onDestroy}>Переглянути товар</Button></Link>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            ))}
                        </div>
                        <div className='sum'>
                            <h3>Загальна сума: <span>{Math.floor(totalPrice * 100) / 100}</span></h3>
                            <button onClick={onDestroy}>До оплати</button>
                        </div>
                    </div>
                </CardContent>
                <DialogActions>
                    <Button variant="outlined" color="error" onClick={onDestroy}>Скасувати</Button>
                </DialogActions>
            </Card>
        </Modal>
    );
};

export default CartModal;
