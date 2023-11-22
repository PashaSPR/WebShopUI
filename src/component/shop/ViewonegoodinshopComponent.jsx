
import React, { useEffect, useState, forwardRef } from 'react';

import { useParams, Link } from 'react-router-dom';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Typography, Rating } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import Modal from 'react-modal';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../css/styleVievonegoods.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddEvaluationDialogComponent from '../evaluation/AddEvaluationDialogComponent';
import MessageEmptyFieldModal from '../modal/MessageEmptyFieldModal';
import ShoppingCartModal from './modal/ShoppingCartModal';

Modal.setAppElement('#root');

const ViewonegoodinshopComponent = () => {
  const { id } = useParams();
  const [goodInShop, setGoodInShop] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState(1);
  const [goodName, setGoodName] = useState('');
  // const [loading, setLoading] = React.useState(true);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingValue, setEditingValue] = useState('');
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // Стан для відображення діалогового вікна
  const [dialogText, setDialogText] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [appointShoppingCartModalOpen, setAppointShoppingCartModalOpen] = useState(false);

  const [deliveriesMethodId, setDeliveriesMethodId] = useState("");
  const [paymentsTypeId, setPaymentsTypeId] = useState("");
  const [payments, setPayments] = useState([]); // стан для збереження методів оплати
  const [deliveries, setDeliveries] = useState([]); // стан для збереження методів доставки

  useEffect(() => {
    fetch(`http://localhost:8080/goodsinvoices/getOne?id=${id}`)
      .then(res => res.json())
      .then(data => setGoodInShop(data))
      .catch(error => console.log(error));
  }, [id]);

  useEffect(() => {
    // Отримання переліку покупців з сервера
    // (тимчасово, поки не буде працювати авторизація)
    fetch(`http://localhost:8080/customers/getAll`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('HTTP Error: ' + res.status);
        }
      })
      .then((data) => {
        // Перевірка, чи отримані дані не є null
        if (data) {
          setCustomers(data);
        } else {
          console.error('Перелік покупців відсутній');
        }
      })
      .catch((error) => console.error('Помилка отримання переліку покупців:', error));
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:8080/paymentsType');
        const data = await response.json();
        setPayments(data);
        console.log('Payments:', data);
      } catch (error) {
        console.error('Помилка при отриманні методів оплати:', error);
      }
    };

    const fetchDeliveries = async () => {
      try {
        const response = await fetch('http://localhost:8080/deliveriesMethod');
        const data = await response.json();
        setDeliveries(data);
        console.log('Доставки:', data);
      } catch (error) {
        console.error('Помилка при отриманні методів доставки:', error);
      }
    };
    // Викликаємо функції для отримання переліків при завантаженні компонента
    fetchPayments();
    fetchDeliveries();
  }, []);

  // const handleAddToCart = async () => {
  //   const price = goodInShop.price;
  //   // const quantity = 1;

  //   try {
  //     const response = await fetch(`http://localhost:8080/goodsOrders/addToCart`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         goodsInvoicesId: id,
  //         ordersListsId: '1',
  //         customerId: customerId,
  //         price: price,
  //         quantity: quantity,
  //       }),
  //     });

  //     if (response.ok) {
  //       // Успішно додано в кошик
  //     } else {
  //       const errorData = await response.json();
  //       if (response.status === 400) {
  //         // Відображення повідомлення про відсутність товару за допомогою alert
  //         // alert(errorData.message);
  //         setDialogText('Увага!!! :  ' + errorData.message)
  //         setOpenDialog(true); // Відкриваємо діалогове вікно, якщо поля не заповнені
  //       } else {
  //         console.error('Помилка додавання товару в кошик');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Помилка взаємодії з сервером: ', error);
  //   }
  // };

  const handleAddToCart = async () => {
    const price = goodInShop.price;

    try {
      const response = await fetch(`http://localhost:8080/goodsOrders/addToCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goodsInvoicesId: id,
          ordersListsId: '1',
          customerId: customerId,
          price: price,
          quantity: quantity,
        }),
      });

      if (response.ok) {
        // Успішно додано в кошик
        // Оновіть стан для оновлення даних на сторінці
        fetch(`http://localhost:8080/goodsinvoices/getOne?id=${id}`)
          .then(res => res.json())
          .then(data => setGoodInShop(data))
          .catch(error => console.log(error));
      } else {
        const errorData = await response.json();
        if (response.status === 400) {
          // Відображення повідомлення про відсутність товару за допомогою alert
          // alert(errorData.message);
          setDialogText('Увага!!! :  ' + errorData.message)
          setOpenDialog(true); // Відкриваємо діалогове вікно, якщо поля не заповнені
        } else {
          console.error('Помилка додавання товару в кошик');
        }
      }
    } catch (error) {
      console.error('Помилка взаємодії з сервером: ', error);
    }
  };



  const handleOpenCart = () => {
    // setEditedProperty({ id: propertyId, propertiesName: propertyName, type: propertyType });
    // setEditedValue(propertyValue ?? '');
    // // setIsDialogOpen(true);
    // setAppointPropertyValueModalOpen(true)
  };
  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
    setGoodInShop({ ...goodInShop, quantity: newQuantity });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Закриваємо діалогове вікно при натисканні кнопки "OK"
  };

  if (!goodInShop) {
    return <p>Loading...</p>;
  }

  return (

    <div>

      {/* const [deliveriesMethodId, setDeliveriesMethodId] = useState("");
      const [paymentsTypeId, setPaymentsTypeId] = useState(""); */}

      <div>
        <ShoppingCartModal
          appointShoppingCartModalOpen={appointShoppingCartModalOpen}
          setAppointShoppingCartModalOpen={setAppointShoppingCartModalOpen}
          customerId={customerId}
          deliveries={deliveries}
          setDeliveries={setDeliveries}
          payments={payments}
          setPayments={setPayments}
        // editedShoppingCart={editedShoppingCart}
        // setEditedShoppingCart={setEditedShoppingCart}
        // handleSaveShoppingCart={handleSaveShoppingCart} //Передаємо функцію у модальне вікно 
        />
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <div style={{ maxWidth: '250px', margin: '0 auto' }} className="carousel-container">
            <Carousel>
              {goodInShop.goods.photosGoodsDTOS.map((image, index) => (
                <div key={index}>
                  <img src={image.path} alt={`Image ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          </div>
          <div>
            <Paper
              elevation={3}
              component="form"
              sx={{ p: '2px 4px', width: "97%", alignItems: 'center' }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Властивості товару</TableCell>
                      {/* <TableCell align="right">Тип властивості товару</TableCell> */}
                      <TableCell align="right"></TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {/* {goodInShop.goods.propertiesGoodsDTOS.map((property, index) => (
                      <TableRow key={property.id}>
                        <TableCell>{property.propertiesName}</TableCell> */}
                    {/* <TableCell align="right">{property.type ?? "null"}</TableCell> */}

                    {/* <TableCell align="right" className={property.value === null ? 'null-value' : 'not-null-value'}>
                          {property.id === editingPropertyId ? (
                            <input
                              type="text"
                              value={editingValue}
                              onChange={(e) => setEditingValue(e.target.value)}
                            />
                          ) : (
                            property.value ?? "null"
                          )}
                        </TableCell>
                      </TableRow>
                    ))} */}
                    {goodInShop.goods.propertiesGoodsDTOS
                      .filter((property) => property.value !== null && property.value !== undefined && property.value !== "")
                      .map((property, index) => (
                        <TableRow key={property.id}>
                          <TableCell>{property.propertiesName}</TableCell>
                          <TableCell align="right" className={property.value === null ? 'null-value' : 'not-null-value'}>
                            {property.id === editingPropertyId ? (
                              <input
                                type="text"
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.target.value)}
                              />
                            ) : (
                              property.value
                            )}
                          </TableCell>
                        </TableRow>
                      ))}

                  </TableBody>

                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
        <div style={{ width: '50%', marginLeft: '20px', marginTop: '35px' }}>
          <Paper
            elevation={3}
            component="form"
            sx={{ p: '2px 4px', width: "97%", alignItems: 'center' }}
          >


            <div>
              <TextField
                required
                label="Name Good"
                multiline
                value={goodInShop.goods.name ?? ''}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ width: '100%', paddingBottom: '20px' }}
              />
            </div>
            <div>
              <TextField
                required
                label="Short Description"
                multiline
                rows={4}
                value={goodInShop.goods.short_discription ?? ''}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ width: '100%', paddingBottom: '20px' }}
              />
            </div>
            <div>
              <TextField
                required
                label="Продавець"
                multiline
                value={goodInShop.seller.name ?? '' ?? ''}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ width: '100%', paddingBottom: '20px' }}
              />
            </div>
            <div>

              <TextField
                required
                label="Ціна"
                multiline
                value={goodInShop.price + " ₴" ?? ''}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ width: '20%', paddingBottom: '20px' }}

              />
              <TextField
                required
                label="Залишок товару"
                multiline
                value={goodInShop.quantity < 1 ? "Немає на складі" : `${goodInShop.quantity} шт.`}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ width: '40%', paddingBottom: '20px' }}
              />
              <FormControl required sx={{ width: '40%', paddingBottom: '20px' }}>
                <InputLabel id="customer-label">Покупець</InputLabel>
                <Select
                  label="Покупець"
                  labelId="customer-label"
                  id="customer-select"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  sx={{ width: '100%' }}
                >
                  {customers.map(customer => (
                    <MenuItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

            </div>
            <div>

              <TextField
                label="Кількість"
                fullWidth
                type="number"
                value={Math.max(1, Math.min(goodInShop.quantity, quantity))}
                onChange={(e) => setQuantity(e.target.value)}
                inputProps={{
                  max: goodInShop.quantity,
                  min: 1,
                }}
                disabled={goodInShop.quantity <= 0}
                sx={{ width: '15%', paddingBottom: '20px' }}
              />


              <Button variant="outlined"
                disabled={goodInShop.quantity <= 0}
                onClick={() => {

                  // setGoodName(goodInShop.goods.name || '');
                  // setPriceGood(goodInShop.price);
                  // setQuantityGood(1);
                  handleAddToCart();

                }}
              >
                Додати в кошик
              </Button>
              <Button variant="outlined" color="success"
                onClick={() => {
                  // setEditedGoodName(good.name || '');
                  // setEditedGoodSubcategory(good.subcategoryId || ''); // Передаємо поточну підкатегорію товару
                  setAppointShoppingCartModalOpen(true);
                }}
              >
                Кошик
              </Button>
                  <Button style={{ margin: '10px' }} variant="outlined" color="warning" component={Link} to={`/shop`}>
                    Повернутися до товарів
                  </Button>
            </div>
          </Paper>


          <Paper elevation={3} component="form" sx={{ p: '2px 4px', width: "97%", alignItems: 'center' }}>
            <div style={{ margin: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ width: '30%' }}>
                  <Typography>Оцінка товару</Typography>
                  <Rating readOnly value={goodInShop.evaluation} />
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div >
                  <AddEvaluationDialogComponent productId={goodInShop.goods.id} />
                </div>
                <div>
                  <Button variant="outlined" component={Link} to={`/comments?goodsId=${goodInShop.goods.id}`}>Додати коментар</Button>
                </div>
                
              </div>
            </div>
          </Paper>

        </div>
      </div>
      <MessageEmptyFieldModal open={openDialog} onClose={handleCloseDialog} dialogText={dialogText} />
    </div>
  );
};

export default forwardRef((props, ref) => <ViewonegoodinshopComponent {...props} forwardRef={ref} />);