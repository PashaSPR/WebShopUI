import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  Grid, Typography, ThemeProvider, createTheme,  
} from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';
import '../../css/styleModalCatalog.css'

const defaultTheme = createTheme();

export default function ModalCatalogGoodsComponent({ call, onDestroy, onCategorySelect, onSubcategorySelect, onProductSelect }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productsForCategory, setProductsForCategory] = useState([]);

  useEffect(() => {
    fetchCategories();
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

  const fetchProductsByCategory = (categoryId) => {
    return fetch(`http://localhost:8080/subcategoriesGoods/getGoodsByCategoriesId?id=${categoryId}`)
      .then((res) => res.json())
      .catch((error) => {
        console.error('Помилка при отриманні товарів за категорією:', error);
        return [];
      });
  };


  const handleCategorySelect = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  const handleSubcategorySelect = (subcategory) => {
    if (onSubcategorySelect) {
      onSubcategorySelect(subcategory);
    }
  };

  const handleProductSelect = (product) => {
    if (onProductSelect) {
      onProductSelect(product);
    }
  }

  const handleCategoryMouseEnter = (category) => {
    fetchProductsByCategory(category.id)
      .then((result) => {
        setProductsForCategory(result);
        setSelectedCategory(category);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Dialog
        open={call}
        onClose={onDestroy}
        fullWidth
        maxWidth="100hv"
        className='modal'
      >
        <DialogTitle>Каталог товарів</DialogTitle>
        <DialogContent className='modal__content'>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <div>
                {categories.length > 0 && (
                  categories.map((category) => (
                    <Typography gutterBottom
                      key={category.id}
                      className="highlight-on-hover"
                      onMouseEnter={() => handleCategoryMouseEnter(category)}
                      onClick={() => handleCategorySelect(category)}
                      style={{ fontWeight: 'bold' }}
                    >
                      {category.name}
                    </Typography>
                  ))
                )}
              </div>
            </Grid>
            <Grid item xs={6}>
              {selectedCategory && (
                <div>
                  {productsForCategory.length > 0 && (
                    productsForCategory.map((subcategory) => (
                      <div key={subcategory.id}>
                        <Typography gutterBottom
                          className="highlight-on-hover"
                          onClick={() => handleSubcategorySelect(subcategory)}
                          style={{ fontWeight: 'bold' }}
                        >
                          {subcategory.name}
                        </Typography>
                        {subcategory.goods.length > 0 && (
                          subcategory.goods.map((product) => (
                            <Typography gutterBottom
                              key={product.id}
                              className="highlight-on-hover"
                              onClick={() => handleProductSelect(product)}
                            >
                              {product.name}
                            </Typography>
                          ))
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </Grid>           
          </Grid>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
