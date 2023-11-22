import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Comments from '../Users/Comments';
import '../../global.css';
import ModalWnd from '../../components/Modal/ModalWnd';
import axios from 'axios';

export default function ProductDetails() {
  const [modalState, setModalState] = useState(false);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Опис');
  const [goodsInvoice, setGoodsInvoice] = useState(null);
  // const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addToCartMessage, setAddToCartMessage] = useState('');


  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // const handleAddToCart = async () => {
  //   try {
  //     // Відправити POST-запит на сервер з даними нового замовлення
  //     const response = await axios.post('http://localhost:8080/orderLists', {
  //       number: generateOrderNumber(), // Згенерувати номер замовлення
  //       customerId: 1, // Замість 1 повинен бути ідентифікатор покупця
  //     });

  //     console.log('Нове замовлення додано:', response.data);

  //     // Тут ви можете додати логіку для відображення підтвердження додавання товару до кошика
  //   } catch (error) {
  //     console.error('Помилка під час створення замовлення:', error);
  //   }
  // };

  const addToCart = async () => {
    setAddingToCart(true);
    try {
      // Отримати товар з серверу
      const response = await axios.get(`http://localhost:8080/goodsinvoices/getOne?id=${id}`);
      
      // Додати товар до кошика
      const addToCartData = {
        goodsInvoicesId: response.data.id,
        // ordersListsId: generateOrderNumber(), // В цьому полі може бути номер замовлення 
        ordersListsId: 6, //  ідентифікатор замовлення
        price: response.data.price,
        // quantity: selectedQuantity,
        quantity: 1,
      };
      
      // Відправити POST-запит на сервер для додавання товару до кошика
      const cartResponse = await axios.post('http://localhost:8080/goodsOrders', addToCartData);
  
      console.log('Товар додано до кошика:', cartResponse.data);
      setAddToCartMessage('Товар додано до кошика');
      setTimeout(() => {
        // Ця функція буде викликана після 10 секунд.
        // window.location.reload(); // Перезавантаження сторінки.
        window.location.href=`/goodsInvoices/${response.data.id}`; // Перезавантаження сторінки.
    }, 2000); // 10000 мілісекунд (10 секунд)

      
    } catch (error) {
      console.error('Помилка під час додавання товару до кошика:', error);
      setAddToCartMessage('Сталася помилка. Товар не додано.');
    } finally {
      setAddingToCart(false);
    }
  };
  


  useEffect(() => {
    axios.get(`http://localhost:8080/goodsinvoices/getOne?id=${id}`)
      .then(response => setGoodsInvoice(response.data))
      .catch(error => console.log(error));
  }, [id]);

  if (!goodsInvoice) {
    return <div>Loading...</div>;
  }

  // Генерувати випадковий номер замовлення для прикладу
  // const generateOrderNumber = () => {
  //   return Math.floor(1000 + Math.random() * 9000).toString();
  // };

  return (
    <div className='Main'>
      <h1>{goodsInvoice.goods.name}</h1>
      <table>
        <tr>
          <td>
            {goodsInvoice.goods.photosGoodsDTOS && goodsInvoice.goods.photosGoodsDTOS.length > 0 ? (
              <img
                src={goodsInvoice.goods.photosGoodsDTOS[0].path}
                alt={goodsInvoice.goods.photosGoodsDTOS[0].discription}
                onError={(e) => {
                  e.target.src = "https://image-thumbs.shafastatic.net/807950839_310_430"; // Дефолтне фото в разі помилки завантаження
                }}
              />
            ) : (
              <img src="https://image-thumbs.shafastatic.net/807950839_310_430" alt="Дефолтне фото" />
            )}
          </td>
          <td>
            <div className="App">
              <ModalWnd call={modalState} onDestroy={() => setModalState(false)} />
              {/* Повідомлення про додавання товару */}
              {addToCartMessage && <p>{addToCartMessage}</p>}

              <button onClick={() => setModalState(true)} className='btn-buyGoods'>
                <Link to={`/goodsInvoices/${goodsInvoice.id}`}>КОШИК</Link>
                {/* <Link to={`/goodsInvoices/${goodsInvoice.id}`}>КОШИК</Link> */}
              </button>
              {/* <button onClick={handleAddToCart} className='btn-buyGoods'> */}
              <button onClick={addToCart} disabled={addingToCart}className='btn-buyGoods'>
               {addingToCart ? 'Додавання...' : 'Додати в кошик'}{/* Кнопка для додавання товару в кошик */}
              </button>
              <button><Link to="/goodsInvoices">Повернутися до товарів</Link></button>

              <p>Залишок: <span>{goodsInvoice.quantity}</span></p>
              <p>Ціна <span>{goodsInvoice.price}</span></p>
              {/* <input
                type="number"
                min="1"
                max={goodsInvoice.quantity}
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(e.target.value)}

              /> */}
              
              
              {/* <td></td> */}
            </div>
          </td>
        </tr>
      </table>

      <div className='tabs'>
        <button
          className={activeTab === 'Опис' ? 'active-tab' : ''}
          onClick={() => handleTabChange('Опис')}
        >
          Опис
        </button>
        <button
          className={activeTab === 'Характеристика' ? 'active-tab' : ''}
          onClick={() => handleTabChange('Характеристика')}
        >
          Характеристика
        </button>
        <button
          className={activeTab === 'Коментарі' ? 'active-tab' : ''}
          onClick={() => handleTabChange('Коментарі')}
        >
          Коментарі
        </button>
      </div>
      <hr />

      {activeTab === 'Опис' && (
        <>
          <table>
            {/* Вміст для вкладки "Опис" */}
          </table>
          <p>{goodsInvoice.goods.short_discription}</p>
        </>
      )}

      {activeTab === 'Характеристика' && (
        <>
          <p>Властивості</p>
        </>
      )}

      {activeTab === 'Коментарі' && (
        <>
          <Comments />
        </>
      )}
    </div>
  );
}
