import './ModalWnd.css';
import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
// useParams

export default function ModalWnd({ call, onDestroy }) {
    //const [isOpen, setIsOpen] = useState(false); // Стан для відстеження відкриття модального вікна
    // інші стани та функції...
    const [goodsOrders, setGoodsOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [deletedItemId, setDeletedItemId] = useState(null);
    // const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [quantityPerItem, setQuantityPerItem] = useState({});

    const updateQuantity = async (itemId, newQuantity) => {
        try {
            // Відправте PATCH-запит на сервер для оновлення кількості товару
            await axios.patch(`http://localhost:8080/goodsOrders/${itemId}`, {
                quantity: newQuantity,
            });
    
            // Оновіть локальний стан кількості товарів
            setQuantityPerItem((prevQuantityPerItem) => ({
                ...prevQuantityPerItem,
                [itemId]: newQuantity,
            }));
    
            // Оновіть загальну суму або інші необхідні дані
            setTotalPrice(calculateTotalPrice());
        } catch (error) {
            console.error('Помилка під час відправлення PATCH-запиту:', error);
        }
    };
    
    const calculateTotalPrice = useCallback(() => {
        let total = 0;
        goodsOrders.forEach((goodsOrder) => {
            const quantity = quantityPerItem[goodsOrder.id] || goodsOrder.quantity;
            total += goodsOrder.price * quantity;
        });
        return total;
    }, [goodsOrders, quantityPerItem]);
    
    useEffect(() => {
        const updatedTotalPrice = calculateTotalPrice();
        setTotalPrice(updatedTotalPrice);
    }, [goodsOrders, quantityPerItem, calculateTotalPrice]);
    
    useEffect(() => {
        axios.get(`http://localhost:8080/goodsOrders`)
            .then((response) => {
                const initialQuantityPerItem = {};
                response.data.forEach((goodsOrder) => {
                    initialQuantityPerItem[goodsOrder.id] = goodsOrder.quantity;
                });
                setQuantityPerItem(initialQuantityPerItem);
                setGoodsOrders(response.data);
            })
            .catch((error) => console.log(error));
    }, []);//id
  
    useEffect(() => {
        const updatedTotalPrice = calculateTotalPrice();
        setTotalPrice(updatedTotalPrice);
    }, [goodsOrders, quantityPerItem,calculateTotalPrice]);
    console.log(goodsOrders);
    if (!call) {
        return null;
    }
    const closeWnd = (event) => {
    if (event.target.className === 'modal' || event.target.className === 'close') {
        onDestroy();
        // setIsOpen(false); // Закриття модального вікна
    }
};

    const handleDelete = async (id) => {
        try {
            // Виконати DELETE-запит на відповідний URL
            await axios.delete(`http://localhost:8080/goodsOrders/${id}`);

            // Оновити стан товарів після видалення
            const updatedGoodsOrders = goodsOrders.filter(order => order.id !== id);
            setGoodsOrders(updatedGoodsOrders);
            // Видаліть кількість для цього товару зі стану quantityPerItem
            const updatedQuantityPerItem = { ...quantityPerItem };
            delete updatedQuantityPerItem[id];
            setQuantityPerItem(updatedQuantityPerItem);
            //setTimeout(2000);
            setDeletedItemId(id);
            toast.error('Товар було видалено', {
                position: toast.POSITION.TOP_CENTER,
                containerId: 'toast-container', // Унікальний ідентифікатор контейнера
                autoClose: 3000, // Автозакривання через 3 секунди 
                hideProgressBar: false, // Сховати прогрес-бар
                closeOnClick: true, // Закрити при кліку
                pauseOnHover: true, // Пауза при наведенні
                draggable: true, // Пересування повідомлення
            });
        
        } catch (error) {
            console.error('Помилка під час видалення товару:', error);
        }
    }


    return (
        <div onClick={closeWnd} className='modal'>
            {/*  {`modal ${isOpen ? 'open' : ''}`}*/}
            <div className="modal-content">
                <i onClick={onDestroy} className='close'>X</i>
                <h1>Кошик</h1>
                {/* <div className='item'></div>  goodsOrders.length>0*/}
                <hr></hr>
                <div className="btns">
                    {goodsOrders.length < 1 ? (
                        <div>Кошик порожній.</div>
                    ) : (
                        <div className='scroll-container'>
                            {goodsOrders.map((goodsOrder) => (
                                <div key={goodsOrder.id}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h3>{goodsOrder.goodsInvoicesDTO.goods.name}</h3>
                                                    {deletedItemId === goodsOrder.id && (
                                                        <div className="delete-message">Товар {goodsOrder.goodsInvoicesDTO.goods.name} видалено.</div>
                                                    )}
                                                </td>
                                                <td width={400}></td>
                                                <td>
                                                    <button onClick={() => {
                                                        handleDelete(goodsOrder.id);
                                                        setDeletedItemId(goodsOrder.id);
                                                    }}>Видалити</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {goodsOrder.goodsInvoicesDTO.goods.photosGoodsDTOS && goodsOrder.goodsInvoicesDTO.goods.photosGoodsDTOS.length > 0 ? (
                                                        <img
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
                                                            <h3>Кількість: </h3>
                                                            <h3>Вартість:</h3>
                                                            <h3>Сума: </h3>
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                max={goodsOrder.goodsInvoicesDTO.quantity}
                                                                value={quantityPerItem[goodsOrder.id] || 1}
                                                                onChange={(e) => {
                                                                    const newQuantity = parseInt(e.target.value, 10);
                                                                    updateQuantity(goodsOrder.id, newQuantity);
                                                                }}
                                                            />
                                                            <input type='text' id='number' value={goodsOrder.price} readOnly />
                                                            <td>
                                                                <span readOnly>{goodsOrder ? Math.floor(goodsOrder.price * (quantityPerItem[goodsOrder.id] || 1) * 100) / 100 : 'Недоступно'}</span>
                                                            </td>
                                                        </td>
                                                    </tfoot>
                                                    <Link to={`/goodsInvoices/${goodsOrder.goodsInvoicesDTO.id}`}>
                                                        <button onClick={onDestroy} className='reject'>Переглянути товар</button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    )}
                    <hr></hr>
                    {goodsOrders.length > 0 && (
                        <div className='sum'>
                            <h3>Загальна сума: <span >{Math.floor(totalPrice * 100) / 100}</span></h3>
                            <Link to='/payment'><button className='accept'>До оплати</button></Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}