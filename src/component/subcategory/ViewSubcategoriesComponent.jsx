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

// export default class ViewSubcategoriesComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             error: null,
//             isLoaded: false,
//             items: []
//         };
//     }

//     componentDidMount() {
//         fetch('http://localhost:8080/subcategoriesGoods')
//             .then(res => res.json())
//             .then(
//                 result => {
//                     this.setState({
//                         isLoaded: true,
//                         subcategories: result
//                     });
//                 },
//                 error => {
//                     this.setState({
//                         isLoaded: true,
//                         error
//                     });
//                 }
//             );
//     }

//     render() {
//         const { error, isLoaded, subcategories } = this.state;
//         if (error) {
//             throw new Error(error.message); // Генерувати виключення для зупинки виконання і відображення помилки
//         } else if (!isLoaded) {
//             return <p>Loading...</p>;
//         } else {
//             return (
//                 <TableContainer component={Paper}>
//                     <Table sx={{ width: 850, minWidth: 650 }} size="small" aria-label="a dense table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Підкатегорії товару</TableCell>
//                                 <TableCell align="right">Додати властивості товару</TableCell>
//                                 {/* <TableCell align="right">Змінити властивості товару</TableCell>
//                                 <TableCell align="right">Видалити властивості товару</TableCell> */}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {subcategories.map((subcategory) => (
//                                 <TableRow
//                                     key={subcategory.name}
//                                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                 >
//                                     <TableCell component="th" scope="row">
//                                         {subcategory.name}
//                                     </TableCell>
//                                     <TableCell align="right">
//                                         <Button variant="outlined" size="small" component={RouterLink} to={`/addpropertiesbycategory/${subcategory.id}`}>
//                                             Add Properties
//                                         </Button>
//                                     </TableCell>
//                                     {/* <TableCell align="right">
//                                         <Button variant="outlined" size="small" component={RouterLink} to={`/viewonegood/${subcategory.id}`}>
//                                             Edit Properties
//                                         </Button>
//                                     </TableCell>
//                                     <TableCell align="right">
//                                         <Button variant="outlined" size="small" component={RouterLink} to={`/viewonegood/${subcategory.id}`}>
//                                             Delete Properties
//                                         </Button>
//                                     </TableCell> */}
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>

//                 // <div>Viewscsubcategoriesgoods
//                 //     <ul>
//                 //         {items.map(item => (
//                 //             <li key={item.name}>{item.name}</li>
//                 //         ))}
//                 //     </ul>
//                 // </div>
//             );
//         }
//     }
// }



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

// export default class ViewSubcategoriesComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             error: null,
//             isLoaded: false,
//             items: []
//         };
//     }

//     componentDidMount() {
//         fetch('http://localhost:8080/subcategoriesGoods')
//             .then(res => res.json())
//             .then(
//                 result => {
//                     this.setState({
//                         isLoaded: true,
//                         subcategories: result
//                     });
//                 },
//                 error => {
//                     this.setState({
//                         isLoaded: true,
//                         error
//                     });
//                 }
//             );
//     }

//      handleSaveSubcategoryName = () => {
//         const data = {
//           id: subcategoryId,
//           name: editedSubcategoryName
//         };

//         fetch('http://localhost:8080/categoriesGoods/editCategory', {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(data)
//         })
//         .then(response => {
//           if (response.ok) {
//             // Категорія була успішно оновлена, ви можете оновити стан компонента або виконати додаткові дії
//             console.log('Назву категорії успішно змінено');
//             setAppointCategoryNameModalOpen(false);
//           } else {
//             // Обробити помилку, якщо статус відмінний від 200
//             response.json().then(data => {
//               this.setState({ errorMessage: data.message });
//             });
//           }
//         })
//         .catch(error => {
//           console.error('Помилка під час виконання запиту:', error);
//         });
//       };

//     render() {
//         const { error, isLoaded, subcategories, subcategoryId } = this.state;
//         if (error) {
//             throw new Error(error.message); // Генерувати виключення для зупинки виконання і відображення помилки
//         } else if (!isLoaded) {
//             return <p>Loading...</p>;
//         } else {
//             return (
//                 <TableContainer component={Paper}>
//                     <div>
//                         <CategoryNameEditModal
//                             appointSubcategoryNameModalOpen={appointSubcategoryNameModalOpen}
//                             setAppointSubcategoryNameModalOpen={setAppointSubcategoryNameModalOpen}
//                             editedSubcategoryName={editedSubcategoryName}
//                             setEditedSubcategoryName={setEditedSubcategoryName}
//                             handleSaveSubcategoryName={handleSaveSubcategoryName} //Передаємо функцію у модальне вікно 
//                         />
//                     </div>
//                     <Table sx={{ width: 850, minWidth: 650 }} size="small" aria-label="a dense table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Підкатегорії товару</TableCell>
//                                 <TableCell align="right">Додати властивості товару</TableCell>
//                                 {/* <TableCell align="right">Змінити властивості товару</TableCell>
//                                 <TableCell align="right">Видалити властивості товару</TableCell> */}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {subcategories.map((subcategory) => (
//                                 <TableRow
//                                     key={subcategory.name}
//                                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                 >
//                                     <TableCell component="th" scope="row">
//                                         {subcategory.name}
//                                     </TableCell>
//                                     <TableCell align="right">
//                                         <Button variant="outlined" size="small" component={RouterLink} to={`/addpropertiesbycategory/${subcategory.id}`}>
//                                             Додати властивості
//                                         </Button>
//                                     </TableCell>
//                                     {/* <TableCell align="right">
//                                         <Button variant="outlined" size="small" component={RouterLink} to={`/viewonegood/${subcategory.id}`}>
//                                             Edit Properties
//                                         </Button>
//                                     </TableCell>
//                                     <TableCell align="right">
//                                         <Button variant="outlined" size="small" component={RouterLink} to={`/viewonegood/${subcategory.id}`}>
//                                             Delete Properties
//                                         </Button>
//                                     </TableCell> */}
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>

//                 // <div>Viewscsubcategoriesgoods
//                 //     <ul>
//                 //         {items.map(item => (
//                 //             <li key={item.name}>{item.name}</li>
//                 //         ))}
//                 //     </ul>
//                 // </div>
//             );
//         }
//     }
// }
///////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import { Link as RouterLink } from 'react-router-dom';
// import SubcategoryNameEditModal from './SubcategoryNameEditModal';
// import SubcategoryCategoryEditModal from './SubcategoryCategoryEditModal'

// const ViewSubcategoriesComponent = () => {
//     const [error, setError] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [subcategories, setSubcategories] = useState([]);
//     const [subcategoryId, setSubcategoryId] = useState('');
//     const [editedSubcategoryName, setEditedSubcategoryName] = useState('');
//     const [editedSubcategoryCategory, setEditedSubcategoryCategory] = useState(good ? good.subcategoryId || '' : '');
//     const [editedCategoryName, setEditedCategoryName] = useState(category ? category.name || '' : '');
//     const [appointSubcategoryNameModalOpen, setAppointSubcategoryNameModalOpen] = useState(false);
//     const [appointSubcategoryCategoryModalOpen, setAppointSubcategoryCategoryModalOpen] = useState(false);





//     useEffect(() => {
//         fetch('http://localhost:8080/subcategoriesGoods')
//             .then(res => res.json())
//             .then(
//                 result => {
//                     setIsLoaded(true);
//                     setSubcategories(result);
//                 },
//                 error => {
//                     setIsLoaded(true);
//                     setError(error);
//                 }
//             );
//     }, []);

//     const handleSaveSubcategoryName = () => {
//         const data = {
//             id: subcategoryId,
//             name: editedSubcategoryName
//         };

//         fetch('http://localhost:8080/subcategoriesGoods/editSubcategoryName', {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//             .then(response => {
//                 if (response.ok) {
//                     // Категорія була успішно оновлена, ви можете оновити стан компонента або виконати додаткові дії
//                     console.log('Назву категорії успішно змінено');
//                     setAppointSubcategoryNameModalOpen(false);
//                 } else {
//                     // Обробити помилку, якщо статус відмінний від 200
//                     response.json().then(data => {
//                         setError(data.message);
//                     });
//                 }
//             })
//             .catch(error => {
//                 console.error('Помилка під час виконання запиту:', error);
//             });
//     };


//     const handleSaveSubcategoryCategory = async () => {
//         // Отримуємо оновлений опис товару зі стану `editedGoodSubcategory`
//         const newSubcategoryCategory = editedSubcategoryCategory;

//         try {
//           // Виконаємо запит до сервера для оновлення опису товару
//           const response = await fetch(`http://localhost:8080/goods/editGoodSubcategory`, {
//             method: 'PATCH',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               id: id,
//               categoryId: newSubcategoryCategory, // Використовуємо зміну `newGoodSubcategory`
//             }),
//           });

//           if (response.ok) {
//             console.log('Опис товару успішно змінено');
//             setAppointSubcategoryCategoryModalOpen(false);
//           } else {
//             // Обробка помилки від сервера
//             console.error('Помилка при оновленні опису товару:', response.statusText);
//           }
//         } catch (error) {
//           // Обробка помилок під час взаємодії з сервером
//           console.error('Помилка при взаємодії з сервером:', error);
//         }
//       };

//     if (error) {
//         throw new Error(error.message); // Генерувати виключення для зупинки виконання і відображення помилки
//     } else if (!isLoaded) {
//         return <p>Loading...</p>;
//     } else {
//         return (
//             <TableContainer component={Paper}>
//                 <div>
//                     <SubcategoryNameEditModal
//                         appointSubcategoryNameModalOpen={appointSubcategoryNameModalOpen}
//                         setAppointSubcategoryNameModalOpen={setAppointSubcategoryNameModalOpen}
//                         editedSubcategoryName={editedSubcategoryName}
//                         setEditedSubcategoryName={setEditedSubcategoryName}
//                         handleSaveSubcategoryName={handleSaveSubcategoryName} //Передаємо функцію у модальне вікно 
//                     />
//                 </div>
//                 <div>
//                     <SubcategoryCategoryEditModal
//                         appointSubcategoryCategoryModalOpen={appointSubcategoryCategoryModalOpen}
//                         setAppointSubcategoryCategoryModalOpen={setAppointSubcategoryCategoryModalOpen}
//                         editedSubcategoryCategory={editedSubcategoryCategory}
//                         setEditedSubcategoryCategory={setEditedSubcategoryCategory}
//                         categoryName={editedCategoryName}
//                         handleSaveSubcategoryCategory={handleSaveSubcategoryCategory} //Передаємо функцію у модальне вікно 
//                     />
//                 </div>
//                 <Table sx={{ width: 850, minWidth: 650 }} size="small" aria-label="a dense table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Підкатегорії товару</TableCell>
//                             <TableCell></TableCell>
//                             <TableCell></TableCell>
//                             <TableCell align="right">Додати властивості товару</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {subcategories.map((subcategory) => (
//                             <TableRow
//                                 key={subcategory.name}
//                                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                             >
//                                 <TableCell component="th" scope="row">
//                                     {subcategory.name}
//                                 </TableCell>
//                                 <TableCell align="right">
//                                     <Button variant="outlined"
//                                         onClick={() => {
//                                             setEditedSubcategoryName(subcategory.name || '');
//                                             setSubcategoryId(subcategory.id || ''); // Передаємо поточну підкатегорію товару
//                                             setAppointSubcategoryNameModalOpen(true);
//                                         }}
//                                     // disabled={isEditing}
//                                     >
//                                         Змінити назву
//                                     </Button>
//                                 </TableCell>
//                                 <TableCell align="right">
//                                     <Button variant="outlined"
//                                         onClick={() => {
//                                             setEditedCategoryName(good.name || '');
//                                             setEditedSubcategoryCategory(good.subcategoryId || ''); // Передаємо поточну підкатегорію товару
//                                             setAppointSubcategoryCategoryModalOpen(true);
//                                         }} disabled={isEditing}
//                                     >

//                                         Змінити категорію
//                                     </Button>
//                                 </TableCell>
//                                 <TableCell align="right">
//                                     <Button variant="outlined" size="small" component={RouterLink} to={`/addpropertiesbycategory/${subcategory.id}`}>
//                                         Додати властивості
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         );
//     }
// };

// export default ViewSubcategoriesComponent;




import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import SubcategoryNameEditModal from './modal/SubcategoryNameEditModal';
import SubcategoryCategoryEditModal from './modal/SubcategoryCategoryEditModal'


function ViewSubcategoriesComponent() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [subcategories, setSubcategories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const [subcategoryId, setSubcategoryId] = useState('');
    const [editedSubcategoryName, setEditedSubcategoryName] = useState('');
    const [editedSubcategoryCategory, setEditedSubcategoryCategory] = useState('');
    const [appointSubcategoryNameModalOpen, setAppointSubcategoryNameModalOpen] = useState(false);
    const [appointSubcategoryCategoryModalOpen, setAppointSubcategoryCategoryModalOpen] = useState(false);


    useEffect(() => {
        fetch('http://localhost:8080/subcategoriesGoods')
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setSubcategories(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    const handleSaveSubcategoryName = () => {
        const data = {
            id: subcategoryId,
            name: editedSubcategoryName
        };

        fetch('http://localhost:8080/subcategoriesGoods/editSubcategoryName', {
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
                    setAppointSubcategoryNameModalOpen(false);
                } else {
                    // Обробити помилку, якщо статус відмінний від 200
                    response.json().then(data => {
                        setError(data.message);
                    });
                }
            })
            .catch(error => {
                console.error('Помилка під час виконання запиту:', error);
            });
    };


    const handleSaveSubcategoryCategory = async () => {
        // Отримуємо оновлений опис товару зі стану `editedGoodSubcategory`
        const newSubcategoryCategory = editedSubcategoryCategory;


        console.log("subcategoryId    :" + subcategoryId)
        console.log("categoriesGoodsId:" + newSubcategoryCategory)

        try {
            // Виконаємо запит до сервера для оновлення опису товару
            const response = await fetch(`http://localhost:8080/subcategoriesGoods/editSubcategoryСategory`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: subcategoryId,
                    categoriesGoodsId: editedSubcategoryCategory, // Використовуємо зміну `newSubcategoryCategory`
                }),
            });

            if (response.ok) {
                console.log('Опис товару успішно змінено');
                setAppointSubcategoryCategoryModalOpen(false);
            } else {
                // Обробка помилки від сервера
                console.error('Помилка при оновленні опису товару:', response.statusText);
            }
        } catch (error) {
            // Обробка помилок під час взаємодії з сервером
            console.error('Помилка при взаємодії з сервером:', error);
        }
    };

    if (error) {
        throw new Error(error.message); // Генерувати виключення для зупинки виконання і відображення помилки
    } else if (!isLoaded) {
        return <p>Loading...</p>;
    } else {
        return (
            <TableContainer component={Paper}>
                <div>
                    <SubcategoryNameEditModal
                        appointSubcategoryNameModalOpen={appointSubcategoryNameModalOpen}
                        setAppointSubcategoryNameModalOpen={setAppointSubcategoryNameModalOpen}
                        editedSubcategoryName={editedSubcategoryName}
                        setEditedSubcategoryName={setEditedSubcategoryName}
                        handleSaveSubcategoryName={handleSaveSubcategoryName} //Передаємо функцію у модальне вікно 
                    />
                </div>
                <div>
                    <SubcategoryCategoryEditModal
                        appointSubcategoryCategoryModalOpen={appointSubcategoryCategoryModalOpen}
                        setAppointSubcategoryCategoryModalOpen={setAppointSubcategoryCategoryModalOpen}
                        editedSubcategoryCategory={editedSubcategoryCategory}
                        setEditedSubcategoryCategory={setEditedSubcategoryCategory}
                        subcategoryName={editedSubcategoryName}
                        handleSaveSubcategoryCategory={handleSaveSubcategoryCategory} //Передаємо функцію у модальне вікно 
                    />
                </div>
                <Table sx={{ width: 850, minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Підкатегорії товару</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right">Додати властивості товару</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subcategories.map((subcategory) => (

                            <TableRow
                                key={subcategory.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {subcategory.name}
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined"
                                        onClick={() => {
                                            setEditedSubcategoryName(subcategory.name || '');
                                            setSubcategoryId(subcategory.id || ''); // Передаємо поточну підкатегорію товару
                                            setAppointSubcategoryNameModalOpen(true);
                                        }}
                                    // disabled={isEditing}
                                    >
                                        Змінити назву
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined"
                                        onClick={() => {
                                            setEditedSubcategoryName(subcategory.name || '');
                                            setSubcategoryId(subcategory.id || ''); // Передаємо поточну підкатегорію товару
                                            setEditedSubcategoryCategory(subcategory.categoriesGoodsId || ''); // Передаємо поточну категорію товару
                                            setAppointSubcategoryCategoryModalOpen(true);
                                        }} disabled={isEditing}
                                    >
                                        Змінити категорію
                                    </Button>
                                    {/* <Button
                                        variant="outlined"
                                        onClick={() => {
                                            setEditedSubcategoryName(subcategory.name || '');
                                            setSubcategoryId(subcategory.id || ''); // Додайте тут console.log
                                            setEditedSubcategoryCategory(subcategory.categoriesGoodsId || '');
                                            setAppointSubcategoryCategoryModalOpen(true);
                                        }}
                                        disabled={isEditing}
                                    >
                                        Змінити категорію
                                    </Button> */}

                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" size="small" component={RouterLink} to={`/manager/add-property-by-category/${subcategory.id}`}>
                                        Додати властивості
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default ViewSubcategoriesComponent;
