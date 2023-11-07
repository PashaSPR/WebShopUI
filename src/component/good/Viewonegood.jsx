// import React, { useEffect, useState, forwardRef, useRef } from 'react';

// import { useParams } from 'react-router-dom';
// import { Carousel } from 'react-responsive-carousel';

// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Modal from 'react-modal';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
// } from '@mui/material';

// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import '../css/styleVievonegoods.css';

// Modal.setAppElement('#root');

// const Viewonegood = () => {
//   const { id } = useParams();
//   const [good, setGood] = useState(null);
//   const [properties, setProperties] = useState(null);
//   const [editingValue, setEditingValue] = useState('');
//   const [editingPropertyId, setEditingPropertyId] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [checkboxStates, setCheckboxStates] = useState({});

//   const inputRef = useRef(null);
//   const carouselRef = useRef(null);

//   const [editedProperty, setEditedProperty] = useState(null);
//   const [editedValue, setEditedValue] = useState('');
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [loadedProperties, setLoadedProperties] = useState(null);
//   const missingProperties = loadedProperties ? loadedProperties.filter((property) =>
//     !good.propertiesGoodsDTOS.some((goodProperty) => goodProperty.propertiesName === property.name)
//   ) : [];



//   useEffect(() => {
//     // Отримання даних про товар з сервера
//     fetch(`http://localhost:8080/goods/getOne?id=${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         // Перевірка, чи отримані дані не є null
//         if (data) {
//           setGood(data);
//         } else {
//           console.error('Дані про товар отримано в null');
//         }
//       })
//       .catch((error) => console.error('Помилка отримання даних про товар:', error));
//   }, [id]);


//   useEffect(() => {
//     // Завантаження властивостей товару після завантаження даних про товар
//     if (good) {
//       // console.log("goods-getOne-good: " + good);
//       // console.log("goods-getOne-good.subcategoryId: " + good.subcategoryId);
//       fetch(`http://localhost:8080/subcategoriesGoods/getOne?id=${good.subcategoryId}`)
//         .then((res) => res.json())
//         .then((result) => {
//           if (Array.isArray(result.propertiesNameGoodsDTOS)) {
//             setLoadedProperties(result.propertiesNameGoodsDTOS);
//           } else {
//             console.error('Отримані дані не є масивом:', result.propertiesNameGoodsDTOS);
//           }
//         })
//         .catch((error) => console.error('Помилка отримання властивостей:', error));
//     }
//   }, [good]);

//   useEffect(() => {
//     if (loadedProperties) {
//       // Ініціалізуємо стан вибору Checkbox для кожної властивості
//       const initialCheckboxStates = {};
//       loadedProperties.forEach((property) => {
//         initialCheckboxStates[property.name] = good.propertiesGoodsDTOS.some(
//           (goodProperty) => goodProperty.propertiesName === property.name
//         );
//       });
//       setCheckboxStates(initialCheckboxStates);
//     }
//   }, [good, loadedProperties]);

//   const handleEditValue = (propertyId, propertyValue, propertyName, propertyType) => {
//     setEditedProperty({ id: propertyId, propertiesName: propertyName, type: propertyType });
//     setEditedValue(propertyValue ?? '');
//     setIsDialogOpen(true);
//   };

//   const handleSaveValue = async () => {
//     try {
//       // Виконуємо запит до серверу для оновлення значення властивості
//       const response = await fetch(`http://localhost:8080/propertiesGoods`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id: editedProperty.id,
//           value: editedValue,
//         }),
//       });

//       if (response.ok) {
//         // Оновлюємо дані в базі даних
//         const updatedProperties = good.propertiesGoodsDTOS.map((property) => {
//           if (property.id === editedProperty.id) {
//             return { ...property, value: editedValue };
//           }
//           return property;
//         });

//         setGood((prevGood) => ({
//           ...prevGood,
//           propertiesGoodsDTOS: updatedProperties,
//         }));
//       } else {
//         console.error('Помилка при оновленні значення властивості:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Помилка при взаємодії з сервером:', error);
//     }
//     setIsDialogOpen(false);
//   };


//   const handleCarouselItemClick = (e) => {
//     e.preventDefault(); // Блокуємо подію бібліотеки react-responsive-carousel
//     // Додайте код для збереження фотографій або інших дій, які вам потрібні
//   };

//   const handleCheckboxChange = (propertyName) => {
//     setCheckboxStates((prevState) => ({
//       ...prevState,
//       [propertyName]: !prevState[propertyName],
//     }));
//   };

//   const handleClick = async (e) => {
//     console.log("handleClick called");
//     e.preventDefault();

//     const propertiesToSave = selectedProperties;

//     try {
//       // Запит на сервер для створення властивостей та додавання їх до підкатегорії
//       const response = await fetch(`http://localhost:8080/subcategoriesGoods/${id}/addProperties`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(propertiesToSave),
//       });

//       if (response.ok) {
//         // Додаткові дії після успішного збереження
//         console.log('Вибрані властивості збережено успішно');
//       } else {
//         const errorMessage = await response.text();
//         console.error('Помилка при збереженні вибраних властивостей:', errorMessage);
//       }
//     } catch (error) {
//       console.error('Помилка при відправленні запиту на сервер:', error);
//     }
//   };

//   if (!good) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <div>

//         <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
//           <DialogTitle width="550px">Редагування:
//             <h3>{editedProperty?.propertiesName || ''}</h3></DialogTitle>
//           <DialogContent>

//             {/* Поле "Значення властивості" */}
//             <TextField
//               sx={{ marginTop: '20px' }}
//               label="Значення властивості"
//               type={editedProperty?.type === 'INTEGER' || editedProperty?.type === 'FLOAT' ? 'number' : 'text'}
//               value={editedValue}
//               onChange={(e) => setEditedValue(e.target.value)}
//               multiline={editedProperty?.type === 'TEXT' || editedProperty?.type === 'STRING'}
//               rows={editedProperty?.type === 'TEXT' || editedProperty?.type === 'STRING' ? 4 : undefined}
//               fullWidth
//               inputProps={{
//                 step: editedProperty?.type === 'FLOAT' ? '0.01' : undefined, // Для дробових чисел
//               }}
//               select={editedProperty?.type === 'BOOLEAN'} // Для типу BOOLEAN
//               SelectProps={{
//                 native: editedProperty?.type === 'BOOLEAN', // Якщо це select для BOOLEAN, використовуйте нативний HTML select
//               }}
//             >
//               {/* Додаємо опції для BOOLEAN */}
//               {editedProperty?.type === 'BOOLEAN' && (
//                 <>
//                   <option value="true">Так</option>
//                   <option value="false">Ні</option>
//                 </>
//               )}
//             </TextField>

//             {editedProperty?.type === 'DATE' && (
//               <TextField
//                 sx={{ marginTop: '20px' }}
//                 label="Значення властивості (дата)"
//                 type="date"
//                 value={editedValue}
//                 onChange={(e) => setEditedValue(e.target.value)}
//                 fullWidth
//               />
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setIsDialogOpen(false)}>Скасувати</Button>
//             <Button onClick={handleSaveValue}>Зберегти</Button>
//           </DialogActions>
//         </Dialog>




//       </div>

//       <div style={{ display: 'flex', gap: '20px' }}>
//         <div style={{ width: '50%', marginLeft: '20px', marginTop: '35px' }}>
//           <div>
//             <TextField
//               required
//               label="Name Good"
//               multiline
//               value={good.name ?? ''}
//               InputProps={{
//                 readOnly: true,
//               }}
//               sx={{ width: '100%', paddingBottom: '20px' }}
//             />
//           </div>
//           <div>
//             <TextField
//               required
//               label="Short Description"
//               multiline
//               rows={4}
//               value={good.short_discription ?? ''}
//               InputProps={{
//                 readOnly: true,
//               }}
//               sx={{ width: '100%', paddingBottom: '20px' }}
//             />
//           </div>
//           <div>
//             <TextField
//               required
//               label="Subcategory"
//               multiline
//               value={good.subcategoriesGoodsName ?? ''}
//               InputProps={{
//                 readOnly: true,
//               }}
//               sx={{ width: '100%', paddingBottom: '20px' }}
//             />
//           </div>
//           <div style={{ marginTop: '70px' }}>

//             <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Властивості товару</TableCell>
//                     <TableCell align="right">Тип властивості товару</TableCell>
//                     <TableCell align="right">Значення властивості товару</TableCell>
//                     <TableCell align="right"></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {good.propertiesGoodsDTOS.map((property, index) => (
//                     <TableRow key={property.id}>
//                       <TableCell>{property.propertiesName}</TableCell>
//                       <TableCell align="right">{property.type ?? "null"}
//                       </TableCell>
//                       <TableCell align="right" className={property.value === null ? 'null-value' : 'not-null-value'}>
//                         {property.id === editingPropertyId ? (
//                           <input
//                             type="text"
//                             value={editingValue}
//                             onChange={(e) => setEditingValue(e.target.value)}
//                             readOnly={!isEditing}
//                             onFocus={(e) => e.target.select()}
//                             ref={inputRef}
//                             style={{
//                               width: '100%',
//                               border: 'none',
//                               padding: 0,
//                             }}
//                           />
//                         ) : (
//                           property.value ?? "null"
//                         )}
//                       </TableCell>

//                       <TableCell align="right">
//                         <Button
//                           onClick={() => handleEditValue(property.id, property.value, property.propertiesName, property.type)}
//                           disabled={isEditing}
//                         >
//                           Редагувати
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>

//               </Table>
//             </TableContainer>



//           </div>
//         </div>
//         <div style={{ width: '50%' }} className="carousel-container">
//           <Carousel ref={carouselRef}>
//             {good.photosGoodsDTOS.map((image, index) => (
//               <div key={index}>
//                 <img
//                   src={image.path}
//                   alt={`Image ${index + 1}`}
//                   // Додаємо обробник події onClick, який запускається при кліку на слайд
//                   onClick={(e) => handleCarouselItemClick(e, index)}
//                 />
//               </div>
//             ))}
//           </Carousel>
//           <div style={{ display: 'flex' }}>
//             <div style={{ marginLeft: '20px' }}>
//               <h3>Перелік вибраних властивостей:</h3>


//               <ul style={{ marginLeft: '20px' }}>
//                 {loadedProperties && loadedProperties.map((property) => (
//                   <li
//                     key={property.id}
//                     style={{ color: missingProperties.some((missingProperty) => missingProperty.id === property.id) ? 'red' : 'grey' }}
//                   >
//                     {property.name}
//                   </li>
//                 ))}

//               </ul>


//               <FormGroup>
//                 {loadedProperties && loadedProperties.map((property) => (
//                   <FormControlLabel
//                     key={property.id}
//                     control={
//                       <Checkbox
//                         checked={
//                           checkboxStates[property.name] ||
//                           good.propertiesGoodsDTOS.some((goodProperty) => goodProperty.propertiesName === property.name)
//                         }
//                         onChange={() => handleCheckboxChange(property.name)} // Обробник подій для зміни стану вибору



//                       disabled={good.propertiesGoodsDTOS.some((goodProperty) => goodProperty.propertiesName === property.name)}
//                       />
//                     }
//                     label={property.name}
//                   />
//                 ))}
//               </FormGroup>


//             </div>
//             <div style={{ marginLeft: '50px' }}>
//               <Button variant="contained" color="success"
//               onClick={handleClick}
//               >
//                 Add Property
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default forwardRef((props, ref) => <Viewonegood {...props} forwardRef={ref} />);




// import React, { useEffect, useState, forwardRef, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { Carousel } from 'react-responsive-carousel';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Modal from 'react-modal';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
// } from '@mui/material';

// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import '../css/styleVievonegoods.css';

// Modal.setAppElement('#root');

// const Viewonegood = () => {
//   const { id } = useParams();
//   const [good, setGood] = useState(null);
//   const [editingValue, setEditingValue] = useState('');
//   const [editingPropertyId, setEditingPropertyId] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [checkboxStates, setCheckboxStates] = useState({});
//   const inputRef = useRef(null);
//   const carouselRef = useRef(null);
//   const [editedProperty, setEditedProperty] = useState(null);
//   const [editedValue, setEditedValue] = useState('');
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [loadedProperties, setLoadedProperties] = useState(null);
//   const missingProperties = loadedProperties
//     ? loadedProperties.filter((property) =>
//         !good.propertiesGoodsDTOS.some((goodProperty) => goodProperty.propertiesName === property.name)
//       )
//     : [];
//   const [selectedProperties, setSelectedProperties] = useState([]);



//   useEffect(() => {
//     // Отримання даних про товар з сервера
//     fetch(`http://localhost:8080/goods/getOne?id=${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         // Перевірка, чи отримані дані не є null
//         if (data) {
//           setGood(data);
//         } else {
//           console.error('Дані про товар отримано в null');
//         }
//       })
//       .catch((error) => console.error('Помилка отримання даних про товар:', error));
//   }, [id]);

//   useEffect(() => {
//     // Завантаження властивостей товару після завантаження даних про товар
//     if (good) {
//       fetch(`http://localhost:8080/subcategoriesGoods/getOne?id=${good.subcategoryId}`)
//         .then((res) => res.json())
//         .then((result) => {
//           if (Array.isArray(result.propertiesNameGoodsDTOS)) {
//             setLoadedProperties(result.propertiesNameGoodsDTOS);
//           } else {
//             console.error('Отримані дані не є масивом:', result.propertiesNameGoodsDTOS);
//           }
//         })
//         .catch((error) => console.error('Помилка отримання властивостей:', error));
//     }
//   }, [good]);

//   useEffect(() => {
//     if (loadedProperties) {
//       // Ініціалізуємо стан вибору Checkbox для кожної властивості
//       const initialCheckboxStates = {};
//       loadedProperties.forEach((property) => {
//         initialCheckboxStates[property.name] = good.propertiesGoodsDTOS.some(
//           (goodProperty) => goodProperty.propertiesName === property.name
//         );
//       });
//       setCheckboxStates(initialCheckboxStates);
//     }
//   }, [good, loadedProperties]);

//   const handleEditValue = (propertyId, propertyValue, propertyName, propertyType) => {
//     setEditedProperty({ id: propertyId, propertiesName: propertyName, type: propertyType });
//     setEditedValue(propertyValue ?? '');
//     setIsDialogOpen(true);
//   };

//   const handleSaveValue = async () => {
//     try {
//       // Виконуємо запит до серверу для оновлення значення властивості
//       const response = await fetch(`http://localhost:8080/propertiesGoods`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id: editedProperty.id,
//           value: editedValue,
//         }),
//       });

//       if (response.ok) {
//         // Оновлюємо дані в базі даних
//         const updatedProperties = good.propertiesGoodsDTOS.map((property) => {
//           if (property.id === editedProperty.id) {
//             return { ...property, value: editedValue };
//           }
//           return property;
//         });

//         setGood((prevGood) => ({
//           ...prevGood,
//           propertiesGoodsDTOS: updatedProperties,
//         }));
//       } else {
//         console.error('Помилка при оновленні значення властивості:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Помилка при взаємодії з сервером:', error);
//     }
//     setIsDialogOpen(false);
//   };

//   const handleCarouselItemClick = (e) => {
//     e.preventDefault();
//     // Додайте код для збереження фотографій або інших дій, які вам потрібні
//   };

//   const handlePropertyChange = (propertyId) => {
//     console.log("handlePropertyChange called with propertyId:", propertyId);
//     if (selectedProperties.includes(propertyId)) {
//       setSelectedProperties(selectedProperties.filter((id) => id !== propertyId));
//     } else {
//       setSelectedProperties([...selectedProperties, propertyId]);
//     }
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();

//     // Зберіть вибрані властивості на основі стану Checkbox
//     // const selectedProperties = [];
//     // for (const propertyName in checkboxStates) {
//     //   if (checkboxStates[propertyName]) {
//     //     selectedProperties.push(propertyName);
//     //   }
//     // }

//     // try {
//       const propertiesToSave = selectedProperties;

//       try {
//         const propertiesToSave = selectedProperties;

//         // Запит до серверу для додавання властивостей до товару
//         const response = await fetch(`http://localhost:8080/goods/${id}/addPropertiesToGood`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(propertiesToSave),
//         });

//         if (response.ok) {
//           const updatedGoodData = await response.json();

//           // Оновіть стан checkboxStates
//           const updatedCheckboxStates = { ...checkboxStates };
//           updatedGoodData.propertiesGoodsDTOS.forEach((property) => {
//             updatedCheckboxStates[property.propertiesName] = true;
//           });
//           setCheckboxStates(updatedCheckboxStates);

//           // Оновіть стан товару та вибраних властивостей
//           setGood((prevGood) => ({
//             ...prevGood,
//             propertiesGoodsDTOS: updatedGoodData.propertiesGoodsDTOS,
//           }));

//           const updatedSelectedProperties = selectedProperties.concat(updatedGoodData.propertiesGoodsDTOS.map(property => property.propertiesName));
//           setSelectedProperties(updatedSelectedProperties);
//         } else {
//           const errorMessage = await response.text();
//           console.error('Помилка при збереженні вибраних властивостей:', errorMessage);
//         }
//       } catch (error) {
//         console.error('Помилка при відправленні запиту на сервер:', error);
//       }
//   };


//   if (!good) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <div>

//         <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
//           <DialogTitle width="550px">Редагування:
//             <h3>{editedProperty?.propertiesName || ''}</h3></DialogTitle>
//           <DialogContent>

//             {/* Поле "Значення властивості" */}
//             <TextField
//               sx={{ marginTop: '20px' }}
//               label="Значення властивості"
//               type={editedProperty?.type === 'INTEGER' || editedProperty?.type === 'FLOAT' ? 'number' : 'text'}
//               value={editedValue}
//               onChange={(e) => setEditedValue(e.target.value)}
//               multiline={editedProperty?.type === 'TEXT' || editedProperty?.type === 'STRING'}
//               rows={editedProperty?.type === 'TEXT' || editedProperty?.type === 'STRING' ? 4 : undefined}
//               fullWidth
//               inputProps={{
//                 step: editedProperty?.type === 'FLOAT' ? '0.01' : undefined, // Для дробових чисел
//               }}
//               select={editedProperty?.type === 'BOOLEAN'} // Для типу BOOLEAN
//               SelectProps={{
//                 native: editedProperty?.type === 'BOOLEAN', // Якщо це select для BOOLEAN, використовуйте нативний HTML select
//               }}
//             >
//               {/* Додаємо опції для BOOLEAN */}
//               {editedProperty?.type === 'BOOLEAN' && (
//                 <>
//                   <option value="true">Так</option>
//                   <option value="false">Ні</option>
//                 </>
//               )}
//             </TextField>

//             {editedProperty?.type === 'DATE' && (
//               <TextField
//                 sx={{ marginTop: '20px' }}
//                 label="Значення властивості (дата)"
//                 type="date"
//                 value={editedValue}
//                 onChange={(e) => setEditedValue(e.target.value)}
//                 fullWidth
//               />
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setIsDialogOpen(false)}>Скасувати</Button>
//             <Button onClick={handleSaveValue}>Зберегти</Button>
//           </DialogActions>
//         </Dialog>




//       </div>

//       <div style={{ display: 'flex', gap: '20px' }}>
//         <div style={{ width: '50%', marginLeft: '20px', marginTop: '35px' }}>
//           <div>
//             <TextField
//               required
//               label="Name Good"
//               multiline
//               value={good.name ?? ''}
//               InputProps={{
//                 readOnly: true,
//               }}
//               sx={{ width: '100%', paddingBottom: '20px' }}
//             />
//           </div>
//           <div>
//             <TextField
//               required
//               label="Short Description"
//               multiline
//               rows={4}
//               value={good.short_discription ?? ''}
//               InputProps={{
//                 readOnly: true,
//               }}
//               sx={{ width: '100%', paddingBottom: '20px' }}
//             />
//           </div>
//           <div>
//             <TextField
//               required
//               label="Subcategory"
//               multiline
//               value={good.subcategoriesGoodsName ?? ''}
//               InputProps={{
//                 readOnly: true,
//               }}
//               sx={{ width: '100%', paddingBottom: '20px' }}
//             />
//           </div>
//           <div style={{ marginTop: '70px' }}>

//             <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Властивості товару</TableCell>
//                     <TableCell align="right">Тип властивості товару</TableCell>
//                     <TableCell align="right">Значення властивості товару</TableCell>
//                     <TableCell align="right"></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {good.propertiesGoodsDTOS.map((property, index) => (
//                     <TableRow key={property.id}>
//                       <TableCell>{property.propertiesName}</TableCell>
//                       <TableCell align="right">{property.type ?? "null"}
//                       </TableCell>
//                       <TableCell align="right" className={property.value === null ? 'null-value' : 'not-null-value'}>
//                         {property.id === editingPropertyId ? (
//                           <input
//                             type="text"
//                             value={editingValue}
//                             onChange={(e) => setEditingValue(e.target.value)}
//                             readOnly={!isEditing}
//                             onFocus={(e) => e.target.select()}
//                             ref={inputRef}
//                             style={{
//                               width: '100%',
//                               border: 'none',
//                               padding: 0,
//                             }}
//                           />
//                         ) : (
//                           property.value ?? "null"
//                         )}
//                       </TableCell>

//                       <TableCell align="right">
//                         <Button
//                           onClick={() => handleEditValue(property.id, property.value, property.propertiesName, property.type)}
//                           disabled={isEditing}
//                         >
//                           Редагувати
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>

//               </Table>
//             </TableContainer>
//           </div>
//         </div>
//         <div style={{ width: '50%' }} className="carousel-container">
//           <Carousel ref={carouselRef}>
//             {good.photosGoodsDTOS.map((image, index) => (
//               <div key={index}>
//                 <img
//                   src={image.path}
//                   alt={`Image ${index + 1}`}
//                   // Додаємо обробник події onClick, який запускається при кліку на слайд
//                   onClick={(e) => handleCarouselItemClick(e, index)}
//                 />
//               </div>
//             ))}
//           </Carousel>
//           <div style={{ display: 'flex' }}>
//             <div style={{ marginLeft: '20px' }}>
//               <h3>Перелік вибраних властивостей:</h3>


//               <ul style={{ marginLeft: '20px' }}>
//                 {loadedProperties && loadedProperties.map((property) => (
//                   <li
//                     key={property.id}
//                     style={{ color: missingProperties.some((missingProperty) => missingProperty.id === property.id) ? 'red' : 'grey' }}
//                   >
//                     {property.name}
//                   </li>
//                 ))}

//               </ul>


//               <FormGroup>
//                 {loadedProperties && loadedProperties.map((property) => (
//                   <FormControlLabel
//                     key={property.id}
//                     control={
//                       <Checkbox
//                         checked={
//                           selectedProperties.includes(property.id) ||
//                           good.propertiesGoodsDTOS.some((goodProperty) => goodProperty.propertiesName === property.name)
//                         }
//                         onChange={() => handlePropertyChange(property.id)} // Обробник подій для зміни стану вибору



//                       disabled={good.propertiesGoodsDTOS.some((goodProperty) => goodProperty.propertiesName === property.name)}
//                       />
//                     }
//                     label={property.name}
//                   />
//                 ))}
//               </FormGroup>


//             </div>
//             <div style={{ marginLeft: '50px' }}>
//               <Button variant="contained" color="success"
//               onClick={handleClick}
//               >
//                 Add Property
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default forwardRef((props, ref) => <Viewonegood {...props} forwardRef={ref} />);





////////14.10.2023//////////////////////////////////////////////////////////////////////////////////



import React, { useEffect, useState, forwardRef, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DirectionsIcon from '@mui/icons-material/Directions';
import Divider from '@mui/material/Divider';
import Modal from 'react-modal';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../css/styleVievonegoods.css';
import GoodNameEditModal from './modal/GoodNameEditModal'
import GoodDescriptionEditModal from './modal/GoodDescriptionEditModal'
import GoodSubcategoryEditModal from './modal/GoodSubcategoryEditModal'
import PropertyValueEditModal from './modal/PropertyValueEditModal'

Modal.setAppElement('#root');

const Viewonegood = () => {
  const { id } = useParams();
  const [good, setGood] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({});
  const inputRef = useRef(null);
  const carouselRef = useRef(null);
  const [editedProperty, setEditedProperty] = useState(null);
  const [editedValue, setEditedValue] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loadedProperties, setLoadedProperties] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState('');
  const missingProperties = loadedProperties
    ? loadedProperties.filter((property) =>
      !good.propertiesGoodsDTOS.some((goodProperty) => goodProperty.propertiesName === property.name)
    )
    : [];
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [isEditGoodNameDialogOpen, setIsEditGoodNameDialogOpen] = useState(false);
  const [editedGoodName, setEditedGoodName] = useState(good ? good.name || '' : '');
  const [editedGoodDescription, setEditedGoodDescription] = useState(good ? good.short_discription || '' : '');
  const [editedGoodSubcategory, setEditedGoodSubcategory] = useState(good ? good.subcategoryId || '' : '');
  const [editedPropertyValue, setEditedPropertyValue] = useState('');
  const [appointGoodNameModalOpen, setAppointGoodNameModalOpen] = useState(false);
  const [appointGoodDescriptionModalOpen, setAppointGoodDescriptionModalOpen] = useState(false);
  const [appointGoodSubcategoryModalOpen, setAppointGoodSubcategoryModalOpen] = useState(false);
  const [appointPropertyValueModalOpen, setAppointPropertyValueModalOpen] = useState(false);


  useEffect(() => {
    // Отримання даних про товар з сервера
    fetch(`http://localhost:8080/goods/getOne?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Перевірка, чи отримані дані не є null
        if (data) {
          setGood(data);
        } else {
          console.error('Дані про товар отримано в null');
        }
      })
      .catch((error) => console.error('Помилка отримання даних про товар:', error));
  }, [id]);

  // useEffect(() => {
  //   // Отримання переліку продавців з сервера
  //   // (тимчасово, поки не буде працювати авторизація)
  //   fetch(`http://localhost:8080/seller/getAll`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // Перевірка, чи отримані дані не є null
  //       if (data) {
  //         setSellers(data);
  //       } else {
  //         console.error('Перелік продавців відсутній');
  //       }
  //     })
  //     .catch((error) => console.error('Помилка отримання переліку продавців :', error));
  // }, [sellers]);


  useEffect(() => {
    // Отримання переліку продавців з сервера
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



  useEffect(() => {
    // Завантаження властивостей товару після завантаження даних про товар
    if (good) {
      fetch(`http://localhost:8080/subcategoriesGoods/getOne?id=${good.subcategoryId}`)
        .then((res) => res.json())
        .then((result) => {
          if (Array.isArray(result.propertiesNameGoodsDTOS)) {
            setLoadedProperties(result.propertiesNameGoodsDTOS);
          } else {
            console.error('Отримані дані не є масивом:', result.propertiesNameGoodsDTOS);
          }
        })
        .catch((error) => console.error('Помилка отримання властивостей:', error));
    }
  }, [good]);

  useEffect(() => {
    if (loadedProperties) {
      // Ініціалізуємо стан вибору Checkbox для кожної властивості
      const initialCheckboxStates = {};
      loadedProperties.forEach((property) => {
        initialCheckboxStates[property.name] = good.propertiesGoodsDTOS.some(
          (goodProperty) => goodProperty.propertiesName === property.name
        );
      });
      setCheckboxStates(initialCheckboxStates);
    }
  }, [good, loadedProperties]);

  const handleEditValue = (propertyId, propertyValue, propertyName, propertyType) => {
    setEditedProperty({ id: propertyId, propertiesName: propertyName, type: propertyType });
    setEditedValue(propertyValue ?? '');
    // setIsDialogOpen(true);
    setAppointPropertyValueModalOpen(true)
  };

  const handleSavePropertyValue = async () => {
    try {
      // Виконуємо запит до серверу для оновлення значення властивості
      const response = await fetch(`http://localhost:8080/propertiesGoods`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editedProperty.id,
          value: editedValue,
        }),
      });

      if (response.ok) {
        // Оновлюємо дані в базі даних
        const updatedProperties = good.propertiesGoodsDTOS.map((property) => {
          if (property.id === editedProperty.id) {
            return { ...property, value: editedValue };
          }
          return property;
        });

        setGood((prevGood) => ({
          ...prevGood,
          propertiesGoodsDTOS: updatedProperties,
        }));
        setAppointPropertyValueModalOpen(false);
      } else {
        console.error('Помилка при оновленні значення властивості:', response.statusText);
      }
    } catch (error) {
      console.error('Помилка при взаємодії з сервером:', error);
    }
    // setIsDialogOpen(false);
  };

  const handleSaveGoodName = async () => {
    // Отримуємо нову назву товару зі стану `editedGoodName`
    const newGoodName = editedGoodName;

    try {
      // Виконаємо запит до сервера для оновлення назви товару
      const response = await fetch(`http://localhost:8080/goods/editGoodName`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          name: newGoodName, // Використовуємо зміну `newGoodName`
        }),
      });

      if (response.ok) {
        console.log('Назву товару успішно змінено');
        setAppointGoodNameModalOpen(false);
      } else {
        // Обробка помилки від сервера
        console.error('Помилка при оновленні назви товару:', response.statusText);
      }
    } catch (error) {
      // Обробка помилок під час взаємодії з сервером
      console.error('Помилка при взаємодії з сервером:', error);
    }
  };

  const handleSaveGoodDescription = async () => {
    // Отримуємо оновлений опис товару зі стану `editedGoodDescription`
    const newGoodDescription = editedGoodDescription;

    try {
      // Виконаємо запит до сервера для оновлення опису товару
      const response = await fetch(`http://localhost:8080/goods/editGoodDescription`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          short_discription: newGoodDescription, // Використовуємо зміну `newGoodDescription`
        }),
      });

      if (response.ok) {
        console.log('Опис товару успішно змінено');
        setAppointGoodDescriptionModalOpen(false);
      } else {
        // Обробка помилки від сервера
        console.error('Помилка при оновленні опису товару:', response.statusText);
      }
    } catch (error) {
      // Обробка помилок під час взаємодії з сервером
      console.error('Помилка при взаємодії з сервером:', error);
    }
  };

  const handleSaveGoodSubcategory = async () => {
    // Отримуємо оновлений опис товару зі стану `editedGoodSubcategory`
    const newGoodSubcategory = editedGoodSubcategory;

    try {
      // Виконаємо запит до сервера для оновлення опису товару
      const response = await fetch(`http://localhost:8080/goods/editGoodSubcategory`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          subcategoryId: newGoodSubcategory, // Використовуємо зміну `newGoodSubcategory`
        }),
      });

      if (response.ok) {
        console.log('Опис товару успішно змінено');
        setAppointGoodSubcategoryModalOpen(false);
      } else {
        // Обробка помилки від сервера
        console.error('Помилка при оновленні опису товару:', response.statusText);
      }
    } catch (error) {
      // Обробка помилок під час взаємодії з сервером
      console.error('Помилка при взаємодії з сервером:', error);
    }
  };

  // const handleCarouselItemClick = (e) => {
  //   e.preventDefault();
  //   // Додайте код для збереження фотографій або інших дій, які вам потрібні
  // };

  const handlePropertyChange = (propertyId) => {
    console.log("handlePropertyChange called with propertyId:", propertyId);
    if (selectedProperties.includes(propertyId)) {
      setSelectedProperties(selectedProperties.filter((id) => id !== propertyId));
    } else {
      setSelectedProperties([...selectedProperties, propertyId]);
    }
  };


  const handleClick = async (e) => {
    e.preventDefault();

    const propertiesToSave = selectedProperties;

    try {
      // Запит до серверу для додавання властивостей до товару
      const response = await fetch(`http://localhost:8080/goods/${id}/addPropertiesToGood`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertiesToSave),
      });

      if (response.ok) {
        const updatedGoodData = await response.json();

        // Оновіть стан checkboxStates
        const updatedCheckboxStates = { ...checkboxStates };
        updatedGoodData.propertiesGoodsDTOS.forEach((property) => {
          updatedCheckboxStates[property.propertiesName] = true;
        });
        setCheckboxStates(updatedCheckboxStates);

        // Оновіть стан товару та вибраних властивостей
        setGood((prevGood) => ({
          ...prevGood,
          propertiesGoodsDTOS: updatedGoodData.propertiesGoodsDTOS,
        }));

        const updatedSelectedProperties = selectedProperties.concat(updatedGoodData.propertiesGoodsDTOS.map(property => property.propertiesName));
        setSelectedProperties(updatedSelectedProperties);
      } else {
        const errorMessage = await response.text();
        console.error('Помилка при збереженні вибраних властивостей:', errorMessage);
      }
    } catch (error) {
      console.error('Помилка при відправленні запиту на сервер:', error);
    }
  };



  if (!good) {
    return <p>Loading...</p>;
  }

  return (
    <div>

      <div>
        <PropertyValueEditModal
          appointPropertyValueModalOpen={appointPropertyValueModalOpen}
          setAppointPropertyValueModalOpen={setAppointPropertyValueModalOpen}
          // editedPropertyValue={editedPropertyValue}
          // setEditedPropertyValue={setEditedPropertyValue}
          editedValue={editedValue}
          setEditedValue={setEditedValue}
          editedProperty={editedProperty}
          setEditedProperty={setEditedProperty}
          handleSavePropertyValue={handleSavePropertyValue} //Передаємо функцію у модальне вікно 
        />
      </div>

      <div>
        <GoodNameEditModal
          appointGoodNameModalOpen={appointGoodNameModalOpen}
          setAppointGoodNameModalOpen={setAppointGoodNameModalOpen}
          editedGoodName={editedGoodName}
          setEditedGoodName={setEditedGoodName}
          handleSaveGoodName={handleSaveGoodName} //Передаємо функцію у модальне вікно 
        />
      </div>

      <div>
        <GoodDescriptionEditModal
          appointGoodDescriptionModalOpen={appointGoodDescriptionModalOpen}
          setAppointGoodDescriptionModalOpen={setAppointGoodDescriptionModalOpen}
          editedGoodDescription={editedGoodDescription}
          setEditedGoodDescription={setEditedGoodDescription}
          goodName={editedGoodName}
          handleSaveGoodDescription={handleSaveGoodDescription} //Передаємо функцію у модальне вікно 
        />
      </div>

      <div>
        <GoodSubcategoryEditModal
          appointGoodSubcategoryModalOpen={appointGoodSubcategoryModalOpen}
          setAppointGoodSubcategoryModalOpen={setAppointGoodSubcategoryModalOpen}
          editedGoodSubcategory={editedGoodSubcategory}
          setEditedGoodSubcategory={setEditedGoodSubcategory}
          goodName={editedGoodName}
          handleSaveGoodSubcategory={handleSaveGoodSubcategory} //Передаємо функцію у модальне вікно 
        />
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ width: '50%', marginLeft: '20px', marginTop: '35px' }}>
          <Paper
            elevation={3}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
          >
            <TextField
              required
              label="Товар"
              multiline
              value={good.name ?? ''}
              InputProps={{
                readOnly: true,
              }}
              sx={{ width: '100%', paddingBottom: '20px' }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            {/* <Button variant="outlined"
              // onClick={() => handleEditGoodName(good.id, good.name)}
              onClick={() => setIsEditGoodNameDialogOpen(true)}
              disabled={isEditing}
            >
              Edit Good Name
            </Button> */}

            <Button
              variant="outlined"
              onClick={() => {
                setEditedGoodName(good.name || ''); // Передаємо поточну назву товару
                setAppointGoodNameModalOpen(true);
              }}
              disabled={isEditing}
            >
              Змінити
            </Button>


            {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
              <DirectionsIcon />
            </IconButton> */}
          </Paper>
          <Paper
            elevation={3}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
          >
            <TextField
              required
              label="Short Description"
              multiline
              rows={4}
              value={good.short_discription ?? ''}
              InputProps={{
                readOnly: true,
              }}
              sx={{ width: '100%', paddingBottom: '20px' }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Button variant="outlined"
              onClick={() => {
                setEditedGoodName(good.name || '');
                setEditedGoodDescription(good.short_discription || ''); // Передаємо поточний опис товару
                setAppointGoodDescriptionModalOpen(true);
              }}
              disabled={isEditing}
            >
              Змінити
            </Button>
          </Paper>
          <Paper
            elevation={3}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
          >
            <TextField
              required
              label="Subcategory"
              multiline
              value={good.subcategoriesGoodsName ?? ''}
              InputProps={{
                readOnly: true,
              }}
              sx={{ width: '100%', paddingBottom: '20px' }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Button variant="outlined"
              onClick={() => {
                setEditedGoodName(good.name || '');
                setEditedGoodSubcategory(good.subcategoryId || ''); // Передаємо поточну підкатегорію товару
                setAppointGoodSubcategoryModalOpen(true);
              }} disabled={isEditing}
            >
              Змінити
            </Button>
          </Paper>
          <Paper
            elevation={3}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
          >
            <FormControl required sx={{ width: '100%', paddingBottom: '20px' }}>
              <InputLabel id="seller-label">Продавець</InputLabel>
              <Select
                label="Продавець"
                labelId="seller-label"
                id="seller-select"
                value={sellerId}
                onChange={(e) => setSellerId(e.target.value)}
                sx={{ width: '100%', paddingTop: '5px' }}
              >
                {sellers.map(seller => (
                  <MenuItem key={seller.id} value={seller.id}>
                    {seller.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>

          <div style={{ marginTop: '70px' }}>

            <Paper
              elevation={3}
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Властивості товару</TableCell>
                      <TableCell align="right">Тип властивості товару</TableCell>
                      <TableCell align="right">Значення властивості товару</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {good.propertiesGoodsDTOS.map((property, index) => (
                      <TableRow key={property.id}>
                        <TableCell>{property.propertiesName}</TableCell>
                        <TableCell align="right">{property.type ?? "null"}</TableCell>
                        <TableCell align="right" className={property.value === null ? 'null-value' : 'not-null-value'}>
                          {property.id === editingPropertyId ? (
                            <input
                              type="text"
                              value={editingValue}
                              onChange={(e) => setEditingValue(e.target.value)}
                              readOnly={!isEditing}
                              onFocus={(e) => e.target.select()}
                              ref={inputRef}
                              style={{
                                width: '100%',
                                border: 'none',
                                padding: 0,
                              }}
                            />
                          ) : (
                            property.value ?? "null"
                          )}
                        </TableCell>

                        <TableCell align="right">
                          <Button variant="outlined"
                            onClick={() => handleEditValue(property.id, property.value, property.propertiesName, property.type)}
                            disabled={isEditing}
                          >
                            Змінити
                            {/* Edit Property */}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

          </div>
        </div>
        <div>
          <div style={{ width: '50%', margin: '0 auto' }} className="carousel-container">
            <Carousel>
              {good.photosGoodsDTOS.map((image, index) => (
                <div key={index}>
                  <img src={image.path} alt={`Image ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          </div>
          {/* <div style={{ width: '50%' }} className="carousel-container">

            <Carousel ref={carouselRef}>
              {good.photosGoodsDTOS.map((image, index) => (
                <div key={index} style={{ width: '200px' }}>
                  <img
                    src={image.path}
                    alt={`Image ${index + 1}`}
                    // Додаємо обробник події onClick, який запускається при кліку на слайд
                    onClick={(e) => handleCarouselItemClick(e, index)}
                  />
                </div>
              ))}
            </Carousel>
          </div> */}
          <Paper
            elevation={3}
            component="form"
            sx={{ p: '2px 4px', width: "97%", alignItems: 'center' }}
          >


            <div style={{ display: 'flex' }}>
              <div style={{ marginLeft: '20px' }}>
                <h3>Перелік вибраних властивостей:</h3>


                {/* <ul style={{ marginLeft: '20px' }}>
                {loadedProperties && loadedProperties.map((property) => (
                  <li
                    key={property.id}
                    style={{ color: missingProperties.some((missingProperty) => missingProperty.id === property.id) ? 'red' : 'grey' }}
                  >
                    {property.name}
                  </li>
                ))}

              </ul> */}


                <FormGroup>
                  {loadedProperties && loadedProperties.map((property) => (
                    <FormControlLabel
                      key={property.id}
                      control={
                        <Checkbox
                          checked={
                            selectedProperties.includes(property.id) ||
                            good.propertiesGoodsDTOS.some((goodProperty) => goodProperty.propertiesName === property.name)
                          }
                          onChange={() => handlePropertyChange(property.id)} // Обробник подій для зміни стану вибору



                          disabled={good.propertiesGoodsDTOS.some((goodProperty) => goodProperty.propertiesName === property.name)}
                        />
                      }
                      label={property.name}
                    />
                  ))}
                </FormGroup>


              </div>
              <div style={{ marginLeft: '50px' }}>
                <Button variant="contained" color="success"
                  onClick={handleClick}
                >
                  Додати Властивості
                </Button>
              </div>
            </div>

          </Paper>
        </div>
      </div>
    </div>
  );
};

export default forwardRef((props, ref) => <Viewonegood {...props} forwardRef={ref} />);



// import React, { useEffect, useState, forwardRef, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { Carousel } from 'react-responsive-carousel';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import DirectionsIcon from '@mui/icons-material/Directions';
// import Divider from '@mui/material/Divider';
// import Modal from 'react-modal';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
// } from '@mui/material';

// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import '../css/styleVievonegoods.css';

// Modal.setAppElement('#root');

// const Viewonegood = () => {
//   const { id } = useParams();
//   const [good, setGood] = useState(null);
//   const [editingValue, setEditingValue] = useState('');
//   const [editingPropertyId, setEditingPropertyId] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [checkboxStates, setCheckboxStates] = useState({});
//   const inputRef = useRef(null);
//   const carouselRef = useRef(null);
//   const [editedProperty, setEditedProperty] = useState(null);
//   const [editedValue, setEditedValue] = useState('');
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [loadedProperties, setLoadedProperties] = useState(null);
//   const missingProperties = loadedProperties
//     ? loadedProperties.filter((property) =>
//       !good.propertiesGoodsDTOS.some((goodProperty) => goodProperty.propertiesName === property.name)
//     )
//     : [];
//   const [selectedProperties, setSelectedProperties] = useState([]);
//   const [editedName, setEditedName] = useState('');


//   useEffect(() => {
//     // Отримання даних про товар з сервера
//     fetch(`http://localhost:8080/goods/getOne?id=${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         // Перевірка, чи отримані дані не є null
//         if (data) {
//           setGood(data);
//         } else {
//           console.error('Дані про товар отримано в null');
//         }
//       })
//       .catch((error) => console.error('Помилка отримання даних про товар:', error));
//   }, [id]);

//   useEffect(() => {
//     // Завантаження властивостей товару після завантаження даних про товар
//     if (good) {
//       fetch(`http://localhost:8080/subcategoriesGoods/getOne?id=${good.subcategoryId}`)
//         .then((res) => res.json())
//         .then((result) => {
//           if (Array.isArray(result.propertiesNameGoodsDTOS)) {
//             setLoadedProperties(result.propertiesNameGoodsDTOS);
//           } else {
//             console.error('Отримані дані не є масивом:', result.propertiesNameGoodsDTOS);
//           }
//         })
//         .catch((error) => console.error('Помилка отримання властивостей:', error));
//     }
//   }, [good]);

//   useEffect(() => {
//     if (loadedProperties) {
//       // Ініціалізуємо стан вибору Checkbox для кожної властивості
//       const initialCheckboxStates = {};
//       loadedProperties.forEach((property) => {
//         initialCheckboxStates[property.name] = good.propertiesGoodsDTOS.some(
//           (goodProperty) => goodProperty.propertiesName === property.name
//         );
//       });
//       setCheckboxStates(initialCheckboxStates);
//     }
//   }, [good, loadedProperties]);

//   const handleEditValue = (propertyId, propertyValue, propertyName, propertyType) => {
//     setEditedProperty({ id: propertyId, propertiesName: propertyName, type: propertyType });
//     setEditedValue(propertyValue ?? '');
//     setIsDialogOpen(true);
//   };

//   const handleEditGoodName = (goodId, goodName,) => {
//     console.log("goodId:", goodId);
//     console.log("goodName:", goodName);
//     setEditedProperty({ id: goodId, propertiesName: 'Назва товару', type: 'STRING' });
//     setEditedName(goodName ?? '');
//     setIsDialogOpen(true);
//   };

//   const handleSaveValue = async () => {
//     try {
//       // Виконуємо запит до серверу для оновлення значення властивості
//       const response = await fetch(`http://localhost:8080/propertiesGoods`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id: editedProperty.id,
//           value: editedValue,
//         }),
//       });

//       if (response.ok) {
//         // Оновлюємо дані в базі даних
//         const updatedProperties = good.propertiesGoodsDTOS.map((property) => {
//           if (property.id === editedProperty.id) {
//             return { ...property, value: editedValue };
//           }
//           return property;
//         });

//         setGood((prevGood) => ({
//           ...prevGood,
//           propertiesGoodsDTOS: updatedProperties,
//         }));
//       } else {
//         console.error('Помилка при оновленні значення властивості:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Помилка при взаємодії з сервером:', error);
//     }
//     setIsDialogOpen(false);
//   };


//   const handleSaveGoodName = async () => {
//     try {
//       // Виконуємо запит до серверу для оновлення назви товару
//       const response = await fetch(`http://localhost:8080/goods/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: editedName,
//         }),
//       });

//       if (response.ok) {
//         // Оновлюємо ім'я товару в стані
//         setGood((prevGood) => ({
//           ...prevGood,
//           name: editedName,
//         }));
//       } else {
//         console.error('Помилка при оновленні назви товару:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Помилка при взаємодії з сервером:', error);
//     }
//     setIsDialogOpen(false);
//   };

//   const handleCarouselItemClick = (e) => {
//     e.preventDefault();
//     // Додайте код для збереження фотографій або інших дій, які вам потрібні
//   };

//   const handlePropertyChange = (propertyId) => {
//     console.log("handlePropertyChange called with propertyId:", propertyId);
//     if (selectedProperties.includes(propertyId)) {
//       setSelectedProperties(selectedProperties.filter((id) => id !== propertyId));
//     } else {
//       setSelectedProperties([...selectedProperties, propertyId]);
//     }
//   };


//   const handleClick = async (e) => {
//     e.preventDefault();

//     const propertiesToSave = selectedProperties;

//     try {
//       // Запит до серверу для додавання властивостей до товару
//       const response = await fetch(`http://localhost:8080/goods/${id}/addPropertiesToGood`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(propertiesToSave),
//       });

//       if (response.ok) {
//         const updatedGoodData = await response.json();

//         // Оновіть стан checkboxStates
//         const updatedCheckboxStates = { ...checkboxStates };
//         updatedGoodData.propertiesGoodsDTOS.forEach((property) => {
//           updatedCheckboxStates[property.propertiesName] = true;
//         });
//         setCheckboxStates(updatedCheckboxStates);

//         // Оновіть стан товару та вибраних властивостей
//         setGood((prevGood) => ({
//           ...prevGood,
//           propertiesGoodsDTOS: updatedGoodData.propertiesGoodsDTOS,
//         }));

//         const updatedSelectedProperties = selectedProperties.concat(updatedGoodData.propertiesGoodsDTOS.map(property => property.propertiesName));
//         setSelectedProperties(updatedSelectedProperties);
//       } else {
//         const errorMessage = await response.text();
//         console.error('Помилка при збереженні вибраних властивостей:', errorMessage);
//       }
//     } catch (error) {
//       console.error('Помилка при відправленні запиту на сервер:', error);
//     }
//   };



//   if (!good) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <div>

//         <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
//           <DialogTitle sx={{ width: '550px' }}>Редагування:
//             {editedProperty?.propertiesName || ''}
//           </DialogTitle>
//           <DialogContent>
//             {editedProperty?.propertiesName === 'Назва товару' && (
//               <TextField
//                 required
//                 label="Name Good"
//                 multiline
//                 value={editedName}
//                 onChange={(e) => setEditedName(e.target.value)}
//                 sx={{ width: '100%', paddingBottom: '20px' }}
//               />
//             )}
//             {console.log("editedName in Dialog:", editedName)}
//             {/* Поле "Значення властивості" */}
//             <TextField
//               sx={{ marginTop: '20px' }}
//               label="Значення властивості"
//               type={editedProperty?.type === 'INTEGER' || editedProperty?.type === 'FLOAT' ? 'number' : 'text'}
//               value={editedValue}
//               onChange={(e) => setEditedValue(e.target.value)}
//               multiline={editedProperty?.type === 'TEXT' || editedProperty?.type === 'STRING'}
//               rows={editedProperty?.type === 'TEXT' || editedProperty?.type === 'STRING' ? 4 : undefined}
//               fullWidth
//               inputProps={{
//                 step: editedProperty?.type === 'FLOAT' ? '0.01' : undefined, // Для дробових чисел
//               }}
//               select={editedProperty?.type === 'BOOLEAN'} // Для типу BOOLEAN
//               SelectProps={{
//                 native: editedProperty?.type === 'BOOLEAN', // Якщо це select для BOOLEAN, використовуйте нативний HTML select
//               }}
//             >
//               {/* Додаємо опції для BOOLEAN */}
//               {editedProperty?.type === 'BOOLEAN' && (
//                 <>
//                   <option value="true">Так</option>
//                   <option value="false">Ні</option>
//                 </>
//               )}
//             </TextField>
//             {editedProperty?.type === 'DATE' && (
//               <TextField
//                 sx={{ marginTop: '20px' }}
//                 label="Значення властивості (дата)"
//                 type="date"
//                 value={editedValue}
//                 onChange={(e) => setEditedValue(e.target.value)}
//                 fullWidth
//               />
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setIsDialogOpen(false)}>Скасувати</Button>
//             <Button onClick={handleSaveValue}>Зберегти</Button>
//           </DialogActions>
//         </Dialog>
//         <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
//           <DialogTitle>Додавання властивостей</DialogTitle>
//           <DialogContent>
//             <FormGroup>
//               {missingProperties.map((property) => (
//                 <FormControlLabel
//                   key={property.name}
//                   control={
//                     <Checkbox
//                       checked={selectedProperties.includes(property.name)}
//                       onChange={() => handlePropertyChange(property.name)}
//                       name={property.name}
//                     />
//                   }
//                   label={property.name}
//                 />
//               ))}
//             </FormGroup>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClick} color="primary">
//               Додати
//             </Button>
//             <Button onClick={() => setIsEditing(false)} color="primary">
//               Скасувати
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>

//       <div style={{ display: 'flex', gap: '20px' }}>
//         <div style={{ width: '50%', marginLeft: '20px', marginTop: '35px' }}>
//           <Paper
//             component="form"
//             sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
//           >
//             <TextField
//               required
//               label="Name Good"
//               multiline
//               value={good.name ?? ''}
//               InputProps={{
//                 readOnly: true,
//               }}
//               sx={{ width: '100%', paddingBottom: '20px' }}
//             />
//             <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//             <Button variant="outlined"
//               onClick={() => handleEditGoodName(good.id, good.name)}
//               disabled={isEditing}
//             >
//               Edit Good Name
//             </Button>
//           </Paper>
//           <Paper
//             component="form"
//             sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
//           >
//             <TextField
//               required
//               label="Short Description"
//               multiline
//               rows={4}
//               value={good.short_discription ?? ''}
//               InputProps={{
//                 readOnly: true,
//               }}
//               sx={{ width: '100%', paddingBottom: '20px' }}
//             />
//             <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//             <Button variant="outlined"
//               // onClick={() => handleEditValue(property.id, property.value, property.propertiesName, property.type)}
//               disabled={isEditing}
//             >
//               Edit
//               {/* Edit Property */}
//             </Button>
//           </Paper>
//           <Paper
//             component="form"
//             sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
//           >
//             <TextField
//               required
//               label="Subcategory"
//               multiline
//               value={good.subcategoriesGoodsName ?? ''}
//               InputProps={{
//                 readOnly: true,
//               }}
//               sx={{ width: '100%', paddingBottom: '20px' }}
//             />
//             <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//             <Button variant="outlined"
//               // onClick={() => handleEditValue(property.id, property.value, property.propertiesName, property.type)}
//               disabled={isEditing}
//             >
//               Edit
//               {/* Edit Property */}
//             </Button>
//           </Paper>

//           <div style={{ marginTop: '70px' }}>


//             <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Властивості товару</TableCell>
//                     <TableCell align="right">Тип властивості товару</TableCell>
//                     <TableCell align="right">Значення властивості товару</TableCell>
//                     <TableCell align="right"></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {good.propertiesGoodsDTOS.map((property, index) => (
//                     <TableRow key={property.id}>
//                       <TableCell>{property.propertiesName}</TableCell>
//                       <TableCell align="right">{property.type ?? "null"}</TableCell>
//                       <TableCell align="right" className={property.value === null ? 'null-value' : 'not-null-value'}>
//                         {property.id === editingPropertyId ? (
//                           <input
//                             type="text"
//                             value={editingValue}
//                             onChange={(e) => setEditingValue(e.target.value)}
//                             readOnly={!isEditing}
//                             onFocus={(e) => e.target.select()}
//                             ref={inputRef}
//                             style={{
//                               width: '100%',
//                               border: 'none',
//                               padding: 0,
//                             }}
//                           />
//                         ) : (
//                           property.value ?? "null"
//                         )}
//                       </TableCell>

//                       <TableCell align="right">
//                         <Button variant="outlined"
//                           onClick={() => handleEditValue(property.id, property.value, property.propertiesName, property.type)}
//                           disabled={isEditing}
//                         >
//                           Edit
//                           {/* Edit Property */}
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>



//           </div>
//         </div>
//         <div style={{ width: '50%' }} className="carousel-container">
//           <Carousel ref={carouselRef}>
//             {good.photosGoodsDTOS.map((image, index) => (
//               <div key={index}>
//                 <img
//                   src={image.path}
//                   alt={`Image ${index + 1}`}
//                   // Додаємо обробник події onClick, який запускається при кліку на слайд
//                   onClick={(e) => handleCarouselItemClick(e, index)}
//                 />
//               </div>
//             ))}
//           </Carousel>
//           <div style={{ display: 'flex' }}>
//             <div style={{ marginLeft: '20px' }}>
//               <h3>Перелік вибраних властивостей:</h3>


//               {/* <ul style={{ marginLeft: '20px' }}>
//                 {loadedProperties && loadedProperties.map((property) => (
//                   <li
//                     key={property.id}
//                     style={{ color: missingProperties.some((missingProperty) => missingProperty.id === property.id) ? 'red' : 'grey' }}
//                   >
//                     {property.name}
//                   </li>
//                 ))}

//               </ul> */}


//               <FormGroup>
//                 {loadedProperties && loadedProperties.map((property) => (
//                   <FormControlLabel
//                     key={property.id}
//                     control={
//                       <Checkbox
//                         checked={
//                           selectedProperties.includes(property.id) ||
//                           good.propertiesGoodsDTOS.some((goodProperty) => goodProperty.propertiesName === property.name)
//                         }
//                         onChange={() => handlePropertyChange(property.id)} // Обробник подій для зміни стану вибору



//                         disabled={good.propertiesGoodsDTOS.some((goodProperty) => goodProperty.propertiesName === property.name)}
//                       />
//                     }
//                     label={property.name}
//                   />
//                 ))}
//               </FormGroup>


//             </div>
//             <div style={{ marginLeft: '50px' }}>
//               <Button variant="contained" color="success"
//                 onClick={handleClick}
//               >
//                 Add Property
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default forwardRef((props, ref) => <Viewonegood {...props} forwardRef={ref} />);