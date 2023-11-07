import './ModalWnd.css';
import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';//json,
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ModalWnd({ call, onDestroy }) {

   
    const [goodsOrders, setGoodsOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // const [goods, setGoods] = useState([]);
    /*Додавання запису масив або базу даних goodOrders по Id */
    // const [quantity, setQuantity] = useState(goodsOrder.quantity);

    // const { id } = useParams();
    // console.log(goods);
    useEffect(() => {
        //     // Запит до API для отримання даних про користувача за id
        //     // axios.get(`http://localhost:8080/goodsOrders/getOne?id=${id}`)
        axios.get(`http://localhost:8080/goodsOrders`)
            .then(response => setGoodsOrders(response.data))
            .catch((error) => console.log(error));
        //     // axios.get('http://localhost:8080/goods')
        //     //     .then(response => setGoods(response.data))
        //     //     .catch(error => console.log(error));
        //     // axios.get(`http://localhost:8080/goodsOrders/getOne?id=${id}`)
        //     //     .then(response => setQuantity(response.data))
        //     //     .catch(error => console.log(error));
    }, []);//id
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
    if (!call) {
        return null;
    }
    // if (!goodsOrder) {
    //     return <div>Loading...</div>;
    // }
    const closeWnd = (event) => {
        if (event.target.className === 'modal') {
            onDestroy();
        }
    }
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


    return (
        <div onClick={closeWnd} className='modal'>
            <div className="modal-content">
                <i onClick={onDestroy} className='close'>X</i>
                <h1>Кошик</h1>
                {/* <div className='item'></div> */}
                <hr></hr>
                <div className="btns">
                    <div className='scroll-container'>
                        {goodsOrders.map(goodsOrder =>
                            <div key={goodsOrder.id}>


                                <table >
                                    <tr>
                                        {/* <td ><h3 >{goods ? goods.name:'Недоступно'}</h3></td> */}
                                        <td ><h3 >{goodsOrder.goodsInvoicesDTO.goods.name}</h3></td>
                                        <td width={400}></td>
                                        <td >
                                            {/* <Link to=""><button className='del'>Видалити</button></Link> */}
                                            <button onClick={() => handleDelete(goodsOrder.id)}>Видалити</button>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {goodsOrder.goodsInvoicesDTO.goods.photosGoodsDTOS && goodsOrder.goodsInvoicesDTO.goods.photosGoodsDTOS.length > 0 ? (
                                                <img
                                                    src={goodsOrder.goodsInvoicesDTO.goods.photosGoodsDTOS[0].path}
                                                    alt={goodsOrder.goodsInvoicesDTO.goods.photosGoodsDTOS[0].discription}
                                                    onError={(e) => {
                                                        e.target.src = "https://image-thumbs.shafastatic.net/807950839_310_430"; // Дефолтне фото в разі помилки завантаження
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
                                                        <h3>Сума: </h3> </td>
                                                </td>
                                                <td >
                                                    <input type='number' id='number' min={1} defaultValue={goodsOrder ? goodsOrder.quantity : 1}></input>
                                                    <input type='text' id='number' value={goodsOrder.price} readOnly />
                                                    <td><span readOnly>{goodsOrder ? Math.floor(goodsOrder.price * goodsOrder.quantity * 100) / 100 : 'Недоступно'}</span></td>
                                                </td>
                                            </tfoot>
                                            <Link to={`/goodsInvoices/${goodsOrder.goodsInvoicesDTO.id}`}><button onClick={onDestroy} className='reject'>Переглянути товар</button></Link>
                                        </td>
                                    </tr>
                                </table>
                                {/* <div className='sum'>
                                  
                                    {/* <Link to='/payment'><button className='accept'>До оплати</button></Link>input method='post' надіслати суму оплати */}

                                {/*</div> */}

                            </div>
                        )}

                    </div>
                    <div className='sum'>
                        <h3>Загальна сума: <span >{Math.floor(totalPrice * 100) / 100}</span></h3>
                        <Link to='/payment'><button className='accept'>До оплати</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}