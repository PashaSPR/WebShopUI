import React, { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
    TextField, Select, MenuItem, InputLabel,
    FormControl, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, Grid, createTheme,
} from '@mui/material';


import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import MessageEmptyFieldModal from '../modal/MessageEmptyFieldModal';
import ModalCatalogGoodsComponent from '../shop/ModalCatalogGoodsComponent';

const defaultTheme = createTheme();

const ViewGoodsOnCounter = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    product: '',
    minPrice: '',
    maxPrice: '',
  });
  const [categories, setCategories] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [sellerId, setSellerId] = useState(1);
  const [sellers, setSellers] = useState([]);
  const [openDialogModal, setOpenDialogModal] = useState(false);
  const [dialogTextModal, setDialogTextModal] = useState('');

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, [filters]);

  const fetchData = () => {
    let url = 'http://localhost:8080/goodsinvoices/getAllOnCounter';

    if (filters.category) {
      url += `/getByCategoriesId?id=${filters.category}`;
    } else if (filters.subcategory) {
      url += `/getBySubcategoriesId?id=${filters.subcategory}`;
    } else if (filters.product) {
      url += `/getByGoodsId?id=${filters.product}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };


  useEffect(() => {
    // Отримання переліку покупців з сервера
    // (тимчасово, поки не буде працювати авторизація)
    fetch(`http://localhost:8080/sellers/getAll`)
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
          setSellers(data);
        } else {
          console.error('Перелік продавців відсутній');
        }
      })
      .catch((error) => console.error('Помилка отримання переліку продавців:', error));
  }, []);


  const fetchCategories = () => {
    fetch('http://localhost:8080/categoriesGoods')
      .then((res) => res.json())
      .then(
        (result) => {
          setCategories(result);
        },
        (error) => {
          console.error('Помилка при отриманні категорій:', error);
        }
      );
  };

  const handleOpenModal = () => {
    setFilters({
      category: '',
      subcategory: '',
      product: '',
      minPrice: '',
      maxPrice: '',
    });
    setModalState(true);
  };

  const handleCategorySelect = (category) => {
    setFilters((prevState) => ({
      ...prevState,
      category: category.id,
    }));
    setModalState(false);
  };

  const handleSubcategorySelect = (subcategory) => {
    setFilters((prevState) => ({
      ...prevState,
      subcategory: subcategory.id,
    }));
    setModalState(false);
  };

  const handleProductSelect = (product) => {
    setFilters((prevState) => ({
      ...prevState,
      product: product.id,
    }));
    setModalState(false);
  };

  const handleCloseDialogModal = () => {
    setOpenDialogModal(false); // Закриваємо діалогове вікно при натисканні кнопки "OK"
  };

  if (error) {
    return <p>Error {error.message}</p>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
    <div style={{ margin: 20 }}>
    <FormControl required sx={{ width: '40%', paddingBottom: '20px' }}>
        <InputLabel id="seller-label">Продавець</InputLabel>
        <Select
            label="Продавець"
            labelId="seller-label"
            id="seller-select"
            value={sellerId}
            onChange={(e) => setSellerId(e.target.value)} 
            sx={{ width: '100%' }}
        >
            {sellers.map((seller) => (
                <MenuItem key={seller.id} value={seller.id}>
                    {seller.name}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
</div>

        <div>
        <div>
                <ModalCatalogGoodsComponent
                  call={modalState}
                  onDestroy={() => setModalState(false)}
                  onCategorySelect={handleCategorySelect}
                  onSubcategorySelect={handleSubcategorySelect}
                  onProductSelect={handleProductSelect}
                />
              </div>
    <Button variant="outlined" color="primary" onClick={handleOpenModal}>
          Каталог товарів
        </Button>



<Grid container justifyContent="left">


    <Grid >
    {/* <Grid item xs={12} sm={8}> */}

        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: 'auto' }}>Назва товару</TableCell>
                        <TableCell align="left" style={{ width: '145pm%' }}>Фото товару</TableCell>
                        <TableCell align="left" style={{ width: 'auto' }}>Ціна</TableCell>
                        <TableCell align="left" style={{ width: 'auto' }}>Кількість виставленого</TableCell>
                        <TableCell align="left" style={{ width: 'auto' }}>Кількість проданого</TableCell>
                        <TableCell align="left" style={{ width: 'auto' }}>Залишок</TableCell>
                        <TableCell align="left" style={{ width: 'auto' }}>ID продавця</TableCell>
                        <TableCell align="left" style={{ width: 'auto' }}>Переоцінка</TableCell>
                    </TableRow>
                </TableHead>


                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            {/* Комірки рядка таблиці */}
                            <TableCell component="th" scope="row" >
                                {item.goods.name}
                            </TableCell>
                            <TableCell align="left" style={{ width: '7%' }}>
                                <div
                                    style={{
                                        // Збільшуємо розміри зображення на 10% вище і вставляємо його в центр
                                        paddingTop: '100%', // Збільшуємо висоту до 75% (пропорція 4:3)
                                        // backgroundImage: `url(${item.photosGoodsDTOS && item.photosGoodsDTOS.length > 0 ? item.photosGoodsDTOS[0].path : 'https://source.unsplash.com/random?wallpapers'})`,
                                        backgroundImage: `url(${item.goods.photosGoodsDTOS && item.goods.photosGoodsDTOS.length > 0 ? item.goods.photosGoodsDTOS[0].path : 'https://source.unsplash.com/random?wallpapers'})`,
                                        backgroundSize: 'contain', // Вмістити зображення в контейнер
                                        backgroundRepeat: 'no-repeat', // Заборонити повторення фону
                                        backgroundPosition: 'left', // Вирівняти зображення по центру
                                    }}
                                />
                            </TableCell>

                            <TableCell component="th" scope="row" >
                              {item.price}
                            </TableCell>
                            <TableCell component="th" scope="row" >
                                {item.quantityDisplayed}
                            </TableCell>
                            <TableCell component="th" scope="row" >
                                {item.quantityTheShop}
                            </TableCell>
                            <TableCell component="th" scope="row" >
                                {item.quantitySold}
                            </TableCell>
                            <TableCell component="th" scope="row" >
                                {item.sellerId}
                            </TableCell>

                            
                            <TableCell align="left" style={{ width: '20%' }}>
                                <Button variant="outlined" size="small" onClick={() => this.openDialog(item.id)}>
                                    Переоцінка
                                </Button>
                            </TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Grid>
</Grid>
<MessageEmptyFieldModal open={openDialogModal} onClose={handleCloseDialogModal} dialogText={dialogTextModal} />

</div>




        {/* <ThemeProvider theme={defaultTheme}>
          
          <ThemeProvider theme={defaultTheme}>

            <Container sx={{ py: 4, flexBasis: '1z%' }}>

              <div>
                <ModalCatalogGoodsComponent
                  call={modalState}
                  onDestroy={() => setModalState(false)}
                  onCategorySelect={handleCategorySelect}
                  onSubcategorySelect={handleSubcategorySelect}
                  onProductSelect={handleProductSelect}
                />
              </div>
            </Container>
            <main style={{ display: 'flex' }}>
              <Container sx={{ py: 4, flexBasis: '75%' }}>
                <Grid container spacing={4}>
                  {items.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={4}>
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <RouterLink to={`/good/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <div
                            style={{
                              paddingTop: '75%',
                              backgroundImage: `url(${item.goods.photosGoodsDTOS && item.goods.photosGoodsDTOS.length > 0 ? item.goods.photosGoodsDTOS[0].path : 'https://source.unsplash.com/random?wallpapers'})`,
                              backgroundSize: 'contain',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center',
                            }}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                              {item.goods.name}
                            </Typography>

                            <Typography>
                              <Rating readOnly value={item.evaluation ?? 0} />
                            </Typography>

                            <Typography>{item.goods.short_discription}</Typography>
                          </CardContent>
                          <CardContent>
                            <Typography gutterBottom variant="h4" component="h1">
                              {item.price} ₴
                              <h5 >{item.quantity < 1 ? "Товар відсутній" : "Є в наявності"}</h5>
                            </Typography>
                          </CardContent>
                        </RouterLink>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </main>

            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            </Box>
          </ThemeProvider>


        

        </ThemeProvider> */}
      </>
    );
  }
};

export default ViewGoodsOnCounter;







// import React, { Component } from 'react';
// import {
//   Button, Card, CardContent, Container,
//   Grid, Typography, ThemeProvider, createTheme,
//   TextField, FormControl, InputLabel, Select, MenuItem, Rating,
// } from '@mui/material';

// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import { Link as RouterLink } from 'react-router-dom';
// import ModalCatalogGoodsComponent from '../shop/ModalCatalogGoodsComponent';

// const defaultTheme = createTheme();

// export default class ViewGoodsOnCounter extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       error: null,
//       isLoaded: false,
//       items: [],
//       filters: {
//         category: '',
//         subcategory: '',
//         product: '',
//         minPrice: '',
//         maxPrice: '',
//       },
//       categories: [],
//       modalState: false,
//     };
//   }

//   componentDidMount() {
//     this.fetchData();
//     this.fetchCategories();
//   }

//   setModalState = (newState) => {
//     this.setState({ modalState: newState });
//   };

//   fetchData() {
//     const { filters } = this.state;
//     let url = 'http://localhost:8080/goodsinvoices';

//     if (filters.category) {
//       url += `/getByCategoriesId?id=${filters.category}`;
//     } else if (filters.subcategory) {
//       url += `/getBySubcategoriesId?id=${filters.subcategory}`;
//     } else if (filters.product) {
//       url += `/getByGoodsId?id=${filters.product}`;
//     }

//     fetch(url)
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           this.setState({
//             isLoaded: true,
//             items: result,
//           });
//         },
//         (error) => {
//           this.setState({
//             isLoaded: true,
//             error,
//           });
//         }
//       );
//   }

//   fetchCategories() {
//     fetch('http://localhost:8080/categoriesGoods')
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           this.setState({
//             categories: result,
//           });
//         },
//         (error) => {
//           console.error('Помилка при отриманні категорій:', error);
//         }
//       );
//   }

//   handleOpenModal = () => {
//     // Чистим фільтри перед відкриттям модального вікна
//     this.setState(
//       (prevState) => ({
//         filters: {
//           category: '',
//           subcategory: '',
//           product: '',
//           minPrice: '',
//           maxPrice: '',
//         },
//         modalState: true,
//       }),
//       () => {
//         // Перевіряємо, чи видалення фільтрів відбувається перед відкриттям діалогового вікна
//         console.log('Фільтри після очищення:', this.state.filters);
//       }
//     );
//   };

//   handleCategorySelect = (category) => {
//     this.setState(
//       (prevState) => ({
//         filters: {
//           ...prevState.filters,
//           category: category.id,
//         },
//         modalState: false, // Закрити діалогове вікно
//       }),
//       () => {
//         this.fetchData();
//       }
//     );
//   };

//   handleSubcategorySelect = (subcategory) => {
//     this.setState(
//       (prevState) => ({
//         filters: {
//           ...prevState.filters,
//           subcategory: subcategory.id,
//         },
//         modalState: false, // Закрити діалогове вікно
//       }),
//       () => {
//         this.fetchData();
//       }
//     );
//   };

//   handleProductSelect = (product) => {
//     this.setState(
//       (prevState) => ({
//         filters: {
//           ...prevState.filters,
//           product: product.id,
//         },
//         modalState: false, // Закрити діалогове вікно
//       }),
//       () => {
//         this.fetchData();
//       }
//     );
//   };

//   render() {
//     const { error, isLoaded, items, filters, categories, modalState } = this.state;

//     if (error) {
//       return <p>Error {error.message}</p>;
//     } else if (!isLoaded) {
//       return <p>Loading...</p>;
//     } else {
//       return (

//         <>
//           <Button
//             variant="outlined"
//             color="primary"
//             onClick={this.handleOpenModal}
//           >
//             Каталог товарів
//           </Button>
          
//           <ThemeProvider theme={defaultTheme}>

//             <Container sx={{ py: 4, flexBasis: '1z%' }}>

//               <div>
//                 <ModalCatalogGoodsComponent
//                   call={modalState}
//                   onDestroy={() => this.setModalState(false)}
//                   onCategorySelect={this.handleCategorySelect}
//                   onSubcategorySelect={this.handleSubcategorySelect}
//                   onProductSelect={this.handleProductSelect}
//                 />
//               </div>
//             </Container>
//             <main style={{ display: 'flex' }}>
//               <Container sx={{ py: 4, flexBasis: '75%' }}>
//                 <Grid container spacing={4}>
//                   {items.map((item) => (
//                     <Grid item key={item.id} xs={12} sm={6} md={4}>
//                       <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                         <RouterLink to={`/good/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                           <div
//                             style={{
//                               paddingTop: '75%',
//                               backgroundImage: `url(${item.goods.photosGoodsDTOS && item.goods.photosGoodsDTOS.length > 0 ? item.goods.photosGoodsDTOS[0].path : 'https://source.unsplash.com/random?wallpapers'})`,
//                               backgroundSize: 'contain',
//                               backgroundRepeat: 'no-repeat',
//                               backgroundPosition: 'center',
//                             }}
//                           />
//                           <CardContent sx={{ flexGrow: 1 }}>
//                             <Typography gutterBottom variant="h5" component="h2">
//                               {item.goods.name}
//                             </Typography>

//                             <Typography>
//                               <Rating readOnly value={item.evaluation ?? 0} />
//                             </Typography>

//                             <Typography>{item.goods.short_discription}</Typography>
//                           </CardContent>
//                           <CardContent>
//                             <Typography gutterBottom variant="h4" component="h1">
//                               {item.price} ₴
//                               <h5 >{item.quantity < 1 ? "Товар відсутній" : "Є в наявності"}</h5>
//                             </Typography>
//                           </CardContent>
//                         </RouterLink>
//                       </Card>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Container>
//             </main>

//             <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
//               {/* Ваш футер */}
//             </Box>
//           </ThemeProvider>


//         </>
//       );
//     }
//   }
// }










// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';
// import { Button, Typography } from '@mui/material';

// import ModalCatalogGoodsComponent from '../shop/ModalCatalogGoodsComponent';

// export default function ViewGoodsOnCounter() {
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('calories');
//   const [selected, setSelected] = useState([]);
//   const [page, setPage] = useState(0);
//   const [dense, setDense] = useState(false);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const [filters, setFilters] = useState({
//     category: '',
//     subcategory: '',
//     product: '',
//     minPrice: '',
//     maxPrice: '',
//   });

//   const [categories, setCategories] = useState([]);
//   const [modalState, setModalState] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [items, setItems] = useState([]);
//   const [rows, setRows] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchData(); // Викликаємо при завантаженні компонента
//   }, [filters]); 

//   const fetchData = () => {
//     let url = 'http://localhost:8080/goodsinvoices';

//     if (filters.category) {
//       url += `/getByCategoriesId?id=${filters.category}`;
//     } else if (filters.subcategory) {
//       url += `/getBySubcategoriesId?id=${filters.subcategory}`;
//     } else if (filters.product) {
//       url += `/getByGoodsId?id=${filters.product}`;
//     }

//     fetch(url)
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           setIsLoaded(true);
//           setRows(result);
//         },
//         (error) => {
//           setIsLoaded(true);
//           setError(error);
//         }
//       );
//   };


//   function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//       return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//       return 1;
//     }
//     return 0;
//   }
  
//   function getComparator(order, orderBy) {
//     return order === 'desc'
//       ? (a, b) => descendingComparator(a, b, orderBy)
//       : (a, b) => -descendingComparator(a, b, orderBy);
//   }
  
//   // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
//   // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
//   // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
//   // with exampleArray.slice().sort(exampleComparator)
//   function stableSort(array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//       const order = comparator(a[0], b[0]);
//       if (order !== 0) {
//         return order;
//       }
//       return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
//   }



//   handleOpenModal = () => {
//     // Чистим фільтри перед відкриттям модального вікна
//     useState (
//       (prevState) => ({
//         filters: {
//           category: '',
//           subcategory: '',
//           product: '',
//           minPrice: '',
//           maxPrice: '',
//         },
//         modalState: true,
//       }),
//       () => {
//         // Перевіряємо, чи видалення фільтрів відбувається перед відкриттям діалогового вікна
//         console.log('Фільтри після очищення:', this.state.filters);
//       }
//     );
//   };

//   handleCategorySelect = (category) => {
//     this.setState(
//       (prevState) => ({
//         filters: {
//           ...prevState.filters,
//           category: category.id,
//         },
//         modalState: false, // Закрити діалогове вікно
//       }),
//       () => {
//         this.fetchData();
//       }
//     );
//   };

//   handleSubcategorySelect = (subcategory) => {
//     this.setState(
//       (prevState) => ({
//         filters: {
//           ...prevState.filters,
//           subcategory: subcategory.id,
//         },
//         modalState: false, // Закрити діалогове вікно
//       }),
//       () => {
//         this.fetchData();
//       }
//     );
//   };

//   handleProductSelect = (product) => {
//     this.setState(
//       (prevState) => ({
//         filters: {
//           ...prevState.filters,
//           product: product.id,
//         },
//         modalState: false, // Закрити діалогове вікно
//       }),
//       () => {
//         this.fetchData();
//       }
//     );
//   };

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

//   const isSelected = (id) => selected.indexOf(id) !== -1;

//   const visibleRows = React.useMemo(
//     () =>
//       stableSort(rows, getComparator(order, orderBy)).slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage,
//       ),
//     [order, orderBy, page, rowsPerPage],
//   );

//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   return (
//     <>
//       <Button
//         variant="outlined"
//         color="primary"
//         onClick={handleOpenModal}
//       >
//         Каталог товарів
//       </Button>
//       <Box sx={{ width: '100%' }}>
//       <Paper sx={{ width: '100%', mb: 2 }}>
//           <EnhancedTableToolbar numSelected={selected.length} />
//           <TableContainer>
//             <Table
//               sx={{ minWidth: 750 }}
//               aria-labelledby="tableTitle"
//               size={dense ? 'small' : 'medium'}
//             >
//               <EnhancedTableHead
//                 numSelected={selected.length}
//                 order={order}
//                 orderBy={orderBy}
//                 onSelectAllClick={handleSelectAllClick}
//                 onRequestSort={handleRequestSort}
//                 rowCount={rows.length}
//               />
//               <TableBody>
//                 {visibleRows.map((row, index) => {
//                   const isItemSelected = isSelected(row.id);
//                   const labelId = `enhanced-table-checkbox-${index}`;

//                   return (
//                     <TableRow
//                       hover
//                       onClick={(event) => handleClick(event, row.id)}
//                       role="checkbox"
//                       aria-checked={isItemSelected}
//                       tabIndex={-1}
//                       key={row.id}
//                       selected={isItemSelected}
//                       sx={{ cursor: 'pointer' }}
//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           color="primary"
//                           checked={isItemSelected}
//                           inputProps={{
//                             'aria-labelledby': labelId,
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell
//                         component="th"
//                         id={labelId}
//                         scope="row"
//                         padding="none"
//                       >
//                         {row.name}
//                       </TableCell>
//                       <TableCell align="right">{row.goods.name}</TableCell>
//                       <TableCell align="right">{row.goods.short_discription}</TableCell>
//                       <TableCell align="right">{row.price} ₴</TableCell>
//                       <TableCell align="right">{row.quantity}</TableCell>
//                     </TableRow>
//                   );
//                 })}
//                 {emptyRows > 0 && (
//                   <TableRow
//                     style={{
//                       height: (dense ? 33 : 53) * emptyRows,
//                     }}
//                   >
//                     <TableCell colSpan={6} />
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={rows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//       </Box>
//     </>
//   );
// }
