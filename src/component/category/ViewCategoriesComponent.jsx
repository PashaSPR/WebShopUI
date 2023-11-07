import React, { useState, useEffect, forwardRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import CategoryNameEditModal from './modal/CategoryNameEditModal'

const ViewCategoriesComponent = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [categories, setCategories] = useState([]);
    const [appointCategoryNameModalOpen, setAppointCategoryNameModalOpen] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [editedCategoryName, setEditedCategoryName] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/categoriesGoods')
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCategories(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);


    const handleSaveCategoryName = () => {
        const data = {
          id: categoryId,
          name: editedCategoryName
        };
    
        fetch('http://localhost:8080/categoriesGoods/editCategory', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => {
          if (response.ok) {
            // Категорія була успішно оновлена, ви можете оновити стан компонента або виконати додаткові дії
            console.log('Назву категорії успішно змінено');
            setAppointCategoryNameModalOpen(false);
          } else {
            // Обробити помилку, якщо статус відмінний від 200
            response.json().then(data => {
              this.setState({ errorMessage: data.message });
            });
          }
        })
        .catch(error => {
          console.error('Помилка під час виконання запиту:', error);
        });
      };


    if (error) {
        throw new Error(error.message); // Генерувати виключення для зупинки виконання і відображення помилки
    } else if (!isLoaded) {
        return <p>Loading...</p>;
    } else {
        return (
            <TableContainer component={Paper}>
                <div>
                    <CategoryNameEditModal
                        appointCategoryNameModalOpen={appointCategoryNameModalOpen}
                        setAppointCategoryNameModalOpen={setAppointCategoryNameModalOpen}
                        editedCategoryName={editedCategoryName}
                        setEditedCategoryName={setEditedCategoryName}
                        handleSaveCategoryName={handleSaveCategoryName} //Передаємо функцію у модальне вікно 
                    />
                </div>
                <Table sx={{ width: 850, minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Категорії товару</TableCell>
                            <TableCell align="right">Редагувати</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow
                                key={category.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {category.name}
                                </TableCell>
                                <TableCell align="right">
                                    {/* <Button
                                        variant="outlined"
                                        size="small"
                                        component={RouterLink}
                                        setCategoryId={category.id}
                                        to={`/addpropertiesbycategory/${category.id}`}
                                    >
                                        Редагувати
                                    </Button> */}
                                    <Button variant="outlined"
                                        onClick={() => {
                                            setEditedCategoryName(category.name || '');
                                            setCategoryId(category.id || ''); // Передаємо поточну підкатегорію товару
                                            setAppointCategoryNameModalOpen(true);
                                        }} 
                                        // disabled={isEditing}
                                    >
                                        Змінити
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
};

// export default ViewCategoriesComponent;

export default forwardRef((props, ref) => <ViewCategoriesComponent {...props} forwardRef={ref} />);

