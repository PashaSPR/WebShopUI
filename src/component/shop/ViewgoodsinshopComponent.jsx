import React, { Component } from 'react';
import {
  Button, Card, CardContent, Container,
  Grid, Typography, ThemeProvider, createTheme,
  TextField, FormControl, InputLabel, Select, MenuItem, Rating,
} from '@mui/material';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import ModalCatalogGoodsComponent from './ModalCatalogGoodsComponent';

const defaultTheme = createTheme();

export default class ViewgoodsinshopComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      filters: {
        category: '',
        subcategory: '',
        product: '',
        minPrice: '',
        maxPrice: '',
      },
      categories: [],
      modalState: false,
    };
  }

  componentDidMount() {
    this.fetchData();
    this.fetchCategories();
  }

  setModalState = (newState) => {
    this.setState({ modalState: newState });
  };

  fetchData() {
    const { filters } = this.state;
    let url = 'http://localhost:8080/goodsinvoices';

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

  fetchCategories() {
    fetch('http://localhost:8080/categoriesGoods')
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            categories: result,
          });
        },
        (error) => {
          console.error('Помилка при отриманні категорій:', error);
        }
      );
  }

  handleOpenModal = () => {
    // Чистим фільтри перед відкриттям модального вікна
    this.setState(
      (prevState) => ({
        filters: {
          category: '',
          subcategory: '',
          product: '',
          minPrice: '',
          maxPrice: '',
        },
        modalState: true,
      }),
      () => {
        // Перевіряємо, чи видалення фільтрів відбувається перед відкриттям діалогового вікна
        console.log('Фільтри після очищення:', this.state.filters);
      }
    );
  };

  handleCategorySelect = (category) => {
    this.setState(
      (prevState) => ({
        filters: {
          ...prevState.filters,
          category: category.id,
        },
        modalState: false, // Закрити діалогове вікно
      }),
      () => {
        this.fetchData();
      }
    );
  };

  handleSubcategorySelect = (subcategory) => {
    this.setState(
      (prevState) => ({
        filters: {
          ...prevState.filters,
          subcategory: subcategory.id,
        },
        modalState: false, // Закрити діалогове вікно
      }),
      () => {
        this.fetchData();
      }
    );
  };

  handleProductSelect = (product) => {
    this.setState(
      (prevState) => ({
        filters: {
          ...prevState.filters,
          product: product.id,
        },
        modalState: false, // Закрити діалогове вікно
      }),
      () => {
        this.fetchData();
      }
    );
  };

  render() {
    const { error, isLoaded, items, filters, categories, modalState } = this.state;

    if (error) {
      return <p>Error {error.message}</p>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (

        <>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleOpenModal}
          >
            Каталог товарів
          </Button>
          
          <ThemeProvider theme={defaultTheme}>

            <Container sx={{ py: 4, flexBasis: '1z%' }}>

              <div>
                <ModalCatalogGoodsComponent
                  call={modalState}
                  onDestroy={() => this.setModalState(false)}
                  onCategorySelect={this.handleCategorySelect}
                  onSubcategorySelect={this.handleSubcategorySelect}
                  onProductSelect={this.handleProductSelect}
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
              {/* Ваш футер */}
            </Box>
          </ThemeProvider>


        </>
      );
    }
  }
}