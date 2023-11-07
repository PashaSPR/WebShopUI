// import React, { Component } from 'react'
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';



// import { Button } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';

// export default class AddGoodToShopComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             error: null,
//             isLoaded: false,
//             items: [],
//         };
//     }

//     componentDidMount() {
//         fetch('http://localhost:8080/goods')
//             .then((res) => res.json())
//             .then(
//                 (result) => {
//                     this.setState({
//                         isLoaded: true,
//                         items: result,
//                     });
//                 },
//                 (error) => {
//                     this.setState({
//                         isLoaded: true,
//                         error,
//                     });
//                 }
//             );
//     }
//     render() {
//         const { error, isLoaded, items } = this.state;
//         if (error) {
//             throw new Error(error.message); // Генерувати виключення для зупинки виконання і відображення помилки
//         } else if (!isLoaded) {
//             return <p>Loading...</p>;
//         } else {
//             return (
//                 <TableContainer component={Paper}>
//                     <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell component="th" scope="row" style={{ width: '30%' }}>Назва товару</TableCell>
//                                 <TableCell align="right">Фото товару</TableCell>
//                                 <TableCell align="right">Додати товар в магазин</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {items.map((item) => (
//                                 <TableRow key={item.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                                     <TableCell component="th" scope="row" >
//                                         {item.name}
//                                     </TableCell>
//                                     <TableCell align="right">
//                                         <img
//                                             src={item.photosGoodsDTOS[0].path}
//                                             alt={`Image ${item.photosGoodsDTOS[0].description}`}
//                                             style={{ width: '10%' }}
//                                         />
//                                     </TableCell>
//                                     <TableCell align="right">
//                                         <Button size="small" component={RouterLink} to={`/viewonegood/${item.id}`}>
//                                             Add Good
//                                         </Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>


//             );
//         }
//     }
// }
// ///////////////////////зверху робоча версія 2023.08.30////////////////////////////////





import React, { Component } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { Unstable_NumberInput as NumberInput } from '@mui/base';


import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';

export default class AddGoodToShopComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            isDialogOpen: false,
            selectedItemId: null,
            quantity: '',
            price: '',
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/goods')
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }
    openDialog = (itemId) => {
        this.setState({
            isDialogOpen: true,
            selectedItemId: itemId,
        });
    }

    closeDialog = () => {
        this.setState({
            isDialogOpen: false,
            selectedItemId: null,
        });
    }

    handleAddGoodClick = () => {
        const { selectedItemId, quantity, price } = this.state;

        // Створюємо об'єкт для відправки на сервер
        const requestData = {
            goodsId: selectedItemId,
            quantity: parseInt(quantity), // Перетворюємо кількість на ціле число
            price: parseFloat(price), // Перетворюємо ціну на дробове число
        };

        // Відправляємо запит на сервер для збереження товару
        fetch('http://localhost:8080/goodsinvoices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Змінити Content-Type
            },
            body: JSON.stringify(requestData), // Перетворюємо дані в JSON
        })
            .then((response) => response.json())
            .then((data) => {
                // Обробляємо відповідь від сервера, наприклад, виводимо повідомлення про успішне додавання
                console.log('Товар успішно доданий:', data);
                // Очищаємо поля вводу кількості та ціни
                this.setState({
                    quantity: '',
                    price: '',
                });
                // Закриваємо діалогове вікно
                this.closeDialog();
            })
            .catch((error) => {
                // Обробляємо помилку від сервера, наприклад, виводимо повідомлення про помилку
                console.error('Помилка при додаванні товару:', error);
            });
    }

    render() {
        const { error, isLoaded, items, isDialogOpen, selectedItemId, quantity, price } = this.state;

        if (error) {
            throw new Error(error.message); // Генерувати виключення для зупинки виконання і відображення помилки
        } else if (!isLoaded) {
            return <p>Loading...</p>;
        } else {
            return (

                <div>

                    <Dialog open={isDialogOpen} onClose={this.closeDialog}>
                        {/* <DialogTitle >
                            <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Add Good</h1>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                <img
                                    src={selectedItemId ? items.find(item => item.id === selectedItemId).photosGoodsDTOS[0].path : ''}
                                    alt={`Image ${selectedItemId ? items.find(item => item.id === selectedItemId).photosGoodsDTOS[0].description : ''}`}
                                    style={{ width: '20%' }}
                                />
                            </div>
                        </DialogTitle> */}

                        <DialogTitle style={{ marginBottom: '20px', textAlign: 'left' }}>
                            Додати товар в магазин
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                <img
                                    src={selectedItemId ? items.find(item => item.id === selectedItemId).photosGoodsDTOS[0].path : ''}
                                    // alt={`Image ${selectedItemId ? items.find(item => item.id === selectedItemId).photosGoodsDTOS[0].description : ''}`}
                                    alt={` ${selectedItemId ? items.find(item => item.id === selectedItemId).photosGoodsDTOS[0].description : ''}`}
                                    style={{ width: '20%' }}
                                />
                            </div>
                        </DialogTitle>

                        <DialogContent sx={{ marginTop: '20px' }}>
                            {/* Форма для введення даних */}
                            <TextField
                                minRows={2}
                                maxRows={10}
                                placeholder="Назва товару"
                                value={selectedItemId ? items.find(item => item.id === selectedItemId).name : ''}
                                // disabled
                                multiline
                                InputProps={{
                                    readOnly: true,
                                  }}
                                sx={{ color: 'black', marginBottom: '16px', width: '100%' }}
                            />

                            {/* <TextField
                                label="Кількість товару"
                                fullWidth
                                type="number" // Встановлюємо тип на number
                                value={quantity}
                                onChange={e => this.setState({ quantity: e.target.value })}
                                sx={{ marginBottom: '16px' }}
                            />
                            <TextField
                                label="Ціна товару"
                                fullWidth
                                type="number" // Встановлюємо тип на number
                                inputProps={{ step: '0.01' }} // Встановлюємо крок для дробового числа
                                value={price}
                                onChange={e => this.setState({ price: e.target.value })}
                                sx={{ marginBottom: '16px' }}
                            /> */}


                            <DialogContent sx={{ marginTop: '20px' }}>
                                {/* Форма для введення даних */}
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Кількість товару"
                                            fullWidth
                                            type="number"
                                            value={Math.max(1, quantity)} // Обмежуємо значення більше 1
                                            onChange={e => this.setState({ quantity: Math.max(1, e.target.value) })} // Обмежуємо значення більше 1
                                            sx={{ marginBottom: '16px' }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Ціна товару"
                                            fullWidth
                                            type="number"
                                            inputProps={{ step: '0.01' }}
                                            value={Math.max(1, price)} // Обмежуємо значення більше 1
                                            onChange={e => this.setState({ price: Math.max(1, e.target.value) })} // Обмежуємо значення більше 1
                                            sx={{ marginBottom: '16px' }}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" color="error" onClick={this.closeDialog}>
                                Скасувати
                            </Button>      
                            <Button variant="outlined" onClick={this.handleAddGoodClick}>
                                Додати товар
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Grid container justifyContent="left">
                        <Grid item xs={12} sm={8}>

                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ width: 'auto' }}>Назва товару</TableCell>
                                            <TableCell align="left" style={{ width: '145pm%' }}>Фото товару</TableCell>
                                            <TableCell align="left" style={{ width: 'auto' }}>Додати товар в магазин</TableCell>
                                        </TableRow>
                                    </TableHead>


                                    <TableBody>
                                        {items.map((item) => (
                                            <TableRow key={item.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                {/* Комірки рядка таблиці */}
                                                <TableCell component="th" scope="row" >
                                                    {item.name}
                                                </TableCell>
                                                <TableCell align="left" style={{ width: '30%' }}>
                                                    <div
                                                        style={{
                                                            // Збільшуємо розміри зображення на 10% вище і вставляємо його в центр
                                                            paddingTop: '10%', // Збільшуємо висоту до 75% (пропорція 4:3)
                                                            backgroundImage: `url(${item.photosGoodsDTOS && item.photosGoodsDTOS.length > 0 ? item.photosGoodsDTOS[0].path : 'https://source.unsplash.com/random?wallpapers'})`,
                                                            backgroundSize: 'contain', // Вмістити зображення в контейнер
                                                            backgroundRepeat: 'no-repeat', // Заборонити повторення фону
                                                            backgroundPosition: 'left', // Вирівняти зображення по центру
                                                        }}
                                                    />
                                                    {/* <img
                                                src={item.photosGoodsDTOS[0].path}
                                                alt={`Image ${item.photosGoodsDTOS[0].description}`}
                                                style={{ width: '10%' }}
                                            /> */}
                                                </TableCell>
                                                <TableCell align="left" style={{ width: '20%' }}>
                                                    <Button variant="outlined" size="small" onClick={() => this.openDialog(item.id)}>
                                                        Додати товар в магазин
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </div>
            );
        }
    }
}
