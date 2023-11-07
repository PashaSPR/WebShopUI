// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// const Addphotosgood = () => {
//     const [name, setName] = useState('');
//     const [shortDiscription, setShortDiscription] = useState('');
//     const [subcategoryId, setSubcategoryId] = useState('');
//     const [subcategories, setSubcategories] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:8080/subcategoriesGoods')
//             .then(response => response.json())
//             .then(data => setSubcategories(data))
//             .catch(error => console.log(error));
//     }, []);

//     const handleClick = (e) => {
//         e.preventDefault();
//         const good = { name, short_discription: shortDiscription, subcategoryId };
//         console.log(good);
//         fetch('http://localhost:8080/goods', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(good),
//         }).then(() => {
//             console.log('New good added');
//         });
//     };

//     return (
//         <div style={{ width: '100%', marginLeft: '5px' }}>
//             <h1>Add Photo good</h1>
//             <form noValidate autoComplete="off">

//                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px' }}>
//                     <TextField
//                         required
//                         label="Name Good"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         sx={{ width: '100%' }} // Встановлюємо ширину поля
//                     />
//                     <TextField
//                         required
//                         label="Short Description"
//                         multiline
//                         rows={4}
//                         value={shortDiscription}
//                         onChange={(e) => setShortDiscription(e.target.value)}
//                         sx={{ width: '100%' }} // Встановлюємо ширину поля
//                     />
//                     <FormControl required sx={{ width: '100%' }}> {/* Встановлюємо ширину поля */}
//                         <InputLabel id="subcategory-label">Subcategory</InputLabel>
//                         <Select
//                             labelId="subcategory-label"
//                             id="subcategory-select"
//                             value={subcategoryId}
//                             onChange={(e) => setSubcategoryId(e.target.value)}
//                             sx={{ width: '50%' }} // Встановлюємо ширину поля
//                         >
//                             {subcategories.map(subcategory => (
//                                 <MenuItem key={subcategory.id} value={subcategory.id}>
//                                     {subcategory.name}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                     <Button variant="contained" color="success" onClick={handleClick}>
//                         Save Good
//                     </Button>
//                 </Box>

//             </form>
//         </div>
//     );
// };

// export default Addphotosgood;
//////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState, forwardRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { TextField } from '@mui/material';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// const Addphotosgood = () => {
//   const { id } = useParams();
//   const [good, setGood] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:8080/goods/getOne?id=${id}`)
//       .then(res => res.json())
//       .then(data => setGood(data))
//       .catch(error => console.log(error));
//   }, [id]);

//   if (!good) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div style={{ display: 'flex', gap: '20px' }}>
//       <div style={{ width: '50%', marginLeft: '20px', marginTop: '35px'}}>
//         <div>
//           <TextField
//             required
//             label="Name Good"
//             multiline
//             value={good.name}
//             InputProps={{
//               readOnly: true,
//             }}
//             sx={{ width: '100%', paddingBottom: '20px' }} // Встановлюємо ширину поля
//           />
//         </div>
//         <div>
//           <TextField
//             required
//             label="Short Description"
//             multiline
//             rows={4}
//             value={good.short_discription}
//             InputProps={{
//               readOnly: true,
//             }}
//             sx={{ width: '100%', paddingBottom: '20px' }} // Встановлюємо ширину поля
//           />
//         </div>
//         <div>
//           <TextField
//             required
//             label="Subcategory"
//             multiline
//             value={good.subcategoriesGoods.name}
//             InputProps={{
//               readOnly: true,
//             }}
//             sx={{ width: '100%', paddingBottom: '20px' }} // Встановлюємо ширину поля
//           />
//         </div>
//       </div>
//       <div style={{ width: '50%' }}>
//         <Carousel>
//           {good.photosGoods.map((image, index) => (
//             <div key={index}>
//               <img src={image.path} alt={`Image ${index + 1}`} />
//             </div>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default forwardRef((props, ref) => <Addphotosgood {...props} forwardRef={ref} />);



// import React, { useEffect, useState, forwardRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { TextField, Button } from '@mui/material';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// const Addphotosgood = () => {
//   const { id } = useParams();
//   const [good, setGood] = useState(null);
//   const [description, setDescription] = useState('');
//   const [path, setPath] = useState('');

//   useEffect(() => {
//     fetch(`http://localhost:8080/goods/getOne?id=${id}`)
//       .then(res => res.json())
//       .then(data => setGood(data))
//       .catch(error => console.log(error));
//   }, [id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const data = {
//       description: description,
//       path: path,
//       goodsId: id
//     };

//     fetch('http://localhost:8080/photosGoods', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     })
//       .then(res => res.json())
//       .then(data => {
//         // Обробка відповіді від сервера
//         console.log(data);
//         // Очищення полів форми
//         setDescription('');
//         setPath('');
//       })
//       .catch(error => console.log(error));
//   };

//   if (!good) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div style={{ display: 'flex', gap: '20px' }}>
//       <div style={{ width: '50%', marginLeft: '20px', marginTop: '35px'}}>
//         <div>
//           <TextField
//             required
//             label="Name Good"
//             multiline
//             value={good.name}
//             InputProps={{
//               readOnly: true,
//             }}
//             sx={{ width: '100%', paddingBottom: '20px' }}
//           />
//         </div>
//         <div>
//           <TextField
//             required
//             label="Short Description"
//             multiline
//             rows={4}
//             value={good.short_discription}
//             InputProps={{
//               readOnly: true,
//             }}
//             sx={{ width: '100%', paddingBottom: '20px' }}
//           />
//         </div>
//         <div>
//           <TextField
//             required
//             label="Subcategory"
//             multiline
//             value={good.subcategoriesGoods.name}
//             InputProps={{
//               readOnly: true,
//             }}
//             sx={{ width: '100%', paddingBottom: '20px' }}
//           />
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <TextField
//               required
//               label="Description"
//               multiline
//               value={description}
//               onChange={e => setDescription(e.target.value)}
//               sx={{ width: '100%', paddingBottom: '20px' }}
//             />
//           </div>
//           <div>
//             <TextField
//               required
//               label="Path"
//               value={path}
//               onChange={e => setPath(e.target.value)}
//               sx={{ width: '100%', paddingBottom: '20px' }}
//             />
//           </div>
//           <Button type="submit" variant="contained">Add Photo</Button>
//         </form>
//       </div>
//       <div style={{ width: '50%' }}>
//         <Carousel>
//           {good.photosGoods.map((image, index) => (
//             <div key={index}>
//               <img src={image.path} alt={`Image ${index + 1}`} />
//             </div>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default forwardRef((props, ref) => <Addphotosgood {...props} forwardRef={ref} />);



// //////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState, forwardRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { TextField, Button } from '@mui/material';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// const Addphotosgood = () => {
//   const { id } = useParams();
//   const [good, setGood] = useState(null);
//   const [description, setDescription] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:8080/goods/getOne?id=${id}`)
//       .then(res => res.json())
//       .then(data => setGood(data))
//       .catch(error => console.log(error));
//   }, [id]);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   const formData = new FormData();
//   //   formData.append('file', selectedFile);
//   //   formData.append('description', description);
//   //   formData.append('goodsId', id);

//   //   fetch('http://localhost:8080/photosGoods', {
//   //     method: 'POST',
//   //     body: formData
//   //   })
//   //     .then(res => res.json())
//   //     .then(data => {
//   //       // Обробка відповіді від сервера
//   //       console.log(data);
//   //       // Очищення полів форми
//   //       setDescription('');
//   //       setSelectedFile(null);
//   //     })
//   //     .catch(error => console.log(error));
//   // };


//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('file', selectedFile);
//     formData.append('description', description);
//     formData.append('goodsId', id);

//     fetch('http://localhost:8080/photosGoods', {
//       method: 'POST',
//       body: formData,
//       headers: {
//         'Content-Type': 'multipart/form-data' // Встановлення правильного заголовка Content-Type
//       }
//     })
//       .then(res => res.json())
//       .then(data => {
//         // Обробка відповіді від сервера
//         console.log(data);
//         // Очищення полів форми
//         setDescription('');
//         setSelectedFile(null);
//       })
//       .catch(error => console.log(error));
//   };


//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   const formData = new FormData();
//   //   formData.append('file', selectedFile);
//   //   formData.append('description', description);
//   //   formData.append('goodsId', id);

//   //   fetch('http://localhost:8080/photosGoods', {
//   //     method: 'POST',
//   //     body: formData
//   //   })
//   //     .then(res => res.json())
//   //     .then(data => {
//   //       // Обробка відповіді від сервера
//   //       console.log(data);
//   //       // Очищення полів форми
//   //       setDescription('');
//   //       setSelectedFile(null);
//   //     })
//   //     .catch(error => console.log(error));
//   // };




//   if (!good) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div style={{ display: 'flex', gap: '20px' }}>
//       <div style={{ width: '50%', marginLeft: '20px', marginTop: '35px'}}>
//         <div>
//           <TextField
//             required
//             label="Name Good"
//             multiline
//             value={good.name}
//             InputProps={{
//               readOnly: true,
//             }}
//             sx={{ width: '100%', paddingBottom: '20px' }}
//           />
//         </div>
//         <div>
//           <TextField
//             required
//             label="Short Description"
//             multiline
//             rows={4}
//             value={good.short_discription}
//             InputProps={{
//               readOnly: true,
//             }}
//             sx={{ width: '100%', paddingBottom: '20px' }}
//           />
//         </div>
//         <div>
//           <TextField
//             required
//             label="Subcategory"
//             multiline
//             value={good.subcategoriesGoods.name}
//             InputProps={{
//               readOnly: true,
//             }}
//             sx={{ width: '100%', paddingBottom: '20px' }}
//           />
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <TextField
//               required
//               label="Description"
//               multiline
//               value={description}
//               onChange={e => setDescription(e.target.value)}
//               sx={{ width: '100%', paddingBottom: '20px' }}
//             />
//           </div>
//           <div>
//             <input type="file" accept="image/*" onChange={handleFileChange} />
//           </div>
//           <Button type="submit" variant="contained">Add Photo</Button>
//         </form>
//       </div>
//       <div style={{ width: '50%' }}>
//         <Carousel>
//           {good.photosGoods.map((image, index) => (
//             <div key={index}>
//               <img src={image.path} alt={`Image ${index + 1}`} />
//             </div>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default forwardRef((props, ref) => <Addphotosgood {...props} forwardRef={ref} />);

/////////////////////////////////////////////////////////////////////////////////////
// робоча версія
// import React, { useState } from 'react';

// const AddPhotoForm = () => {
//   const [description, setDescription] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [goodsId, setGoodsId] = useState('');

//   const handleDescriptionChange = (event) => {
//     setDescription(event.target.value);
//   };

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleGoodsIdChange = (event) => {
//     setGoodsId(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!selectedFile) {
//       console.error('Файл не вибрано');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('description', description);
//     formData.append('file', selectedFile);
//     formData.append('goodsId', goodsId);

//     try {
//       const response = await fetch('http://localhost:8080/photosGoods', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         // Зображення успішно завантажено
//         console.log('Зображення успішно завантажено');
//       } else {
//         // Обробка помилки при завантаженні зображення
//         console.error('Помилка при завантаженні зображення:', response.statusText);
//       }
//     } catch (error) {
//       // Обробка помилки при взаємодії з сервером
//       console.error('Помилка при взаємодії з сервером:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Додати зображення товару</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="description">Опис:</label>
//         <input
//           type="text"
//           id="description"
//           value={description}
//           onChange={handleDescriptionChange}
//           required
//         />
//         <br />
//         <label htmlFor="file">Зображення:</label>
//         <input
//           type="file"
//           id="file"
//           onChange={handleFileChange}
//           accept="image/*"
//           required
//         />
//         <br />
//         <label htmlFor="goodsId">ID товару:</label>
//         <input
//           type="text"
//           id="goodsId"
//           value={goodsId}
//           onChange={handleGoodsIdChange}
//           required
//         />
//         <br />
//         <button type="submit">Завантажити</button>
//       </form>
//     </div>
//   );
// };

// export default AddPhotoForm;


/////////////////////////////////////////////////////////


// import React, { useEffect, useState, forwardRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { TextField, Button } from '@mui/material';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import '../css/styleCarousel.css'

// const Addphotosgood = () => {
//   const { id } = useParams();
//   const [good, setGood] = useState(null);
//   const [description, setDescription] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);


//   useEffect(() => {
//     fetch(`http://localhost:8080/goods/getOne?id=${id}`)
//       .then(res => res.json())
//       .then(data => setGood(data))
//       .catch(error => console.log(error));
//   }, [id]);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const updateGood = () => {
//     fetch(`http://localhost:8080/goods/getOne?id=${id}`)
//       .then(res => res.json())
//       .then(data => setGood(data))
//       .catch(error => console.log(error));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!selectedFile) {
//       console.error('Файл не вибрано');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('description', description);
//     formData.append('file', selectedFile);
//     formData.append('goodsId', id);

//     try {
//       const response = await fetch('http://localhost:8080/photosGoods', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         // Зображення успішно завантажено
//         console.log('Зображення успішно завантажено');
//         updateGood(); // Оновлення даних товару
//       } else {
//         // Обробка помилки при завантаженні зображення
//         console.error('Помилка при завантаженні зображення:', response.statusText);
//       }
//     } catch (error) {
//       // Обробка помилки при взаємодії з сервером
//       console.error('Помилка при взаємодії з сервером:', error);
//     }

//     // Очищення полів форми
//     setDescription('');
//     setSelectedFile(null);
//   };

//   if (!good) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div style={{ display: 'flex', gap: '20px' }}>
//       <div style={{ width: '50%', marginLeft: '20px', marginTop: '35px'}}>
//         <div>
//           <TextField
//             required
//             label="Name Good"
//             multiline
//             value={good.name}
//             InputProps={{
//               readOnly: true,
//             }}
//             sx={{ width: '100%', paddingBottom: '20px' }}
//           />
//         </div>
//         <div>
//           <TextField
//             required
//             label="Short Description"
//             multiline
//             rows={4}
//             value={good.short_discription}
//             InputProps={{
//               readOnly: true,
//             }}
//             sx={{ width: '100%', paddingBottom: '20px' }}
//           />
//         </div>
//         <div>
//           <TextField
//             required
//             label="Subcategory"
//             multiline
//             value={good.subcategoriesGoods.name}
//             InputProps={{
//               readOnly: true,
//             }}
//             sx={{ width: '100%', paddingBottom: '20px' }}
//           />
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <TextField
//               required
//               label="Description"
//               multiline
//               value={description}
//               onChange={e => setDescription(e.target.value)}
//               sx={{ width: '100%', paddingBottom: '20px' }}
//             />
//           </div>
//           <div>
//             <input type="file" accept="image/*" onChange={handleFileChange} />
//           </div>
//           <Button type="submit" variant="contained">Add Photo</Button>
//         </form>
//       </div>
//       <div style={{ width: '50%' }} >
//         <Carousel>
//           {good.photosGoods.map((image, index) => (
//             <div key={index}>
//               <img src={image.path} alt={`Image ${index + 1}`}/>
//             </div>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default forwardRef((props, ref) => <Addphotosgood {...props} forwardRef={ref} />);



////////////////////////////////////////////////////////


import React, { useEffect, useState, forwardRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../css/styleCarousel.css';

const Addphotosgood = () => {
  const { id } = useParams();
  const [good, setGood] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/goods/getOne?id=${id}`)
      .then(res => res.json())
      .then(data => setGood(data))
      .catch(error => console.log(error));
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      // Файл не був вибраний. Можна додати додаткову логіку тут, якщо потрібно
      setImageUrl(null); // Обнулення URL зображення
      return;
    }

    setSelectedFile(file);

    // Перетворюємо вибраний файл на URL зображення
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setImageUrl(fileReader.result);
    };
  };

  const updateGood = () => {
    fetch(`http://localhost:8080/goods/getOne?id=${id}`)
      .then(res => res.json())
      .then(data => setGood(data))
      .catch(error => console.log(error));
  };

  const handleDeleteImage = async (index) => {
    // Визначте id зображення для видалення
    const imageIdToDelete = good.photosGoodsDTOS[index].id;

    try {
      // Виконайте HTTP DELETE-запит до сервера
      const response = await fetch(`http://localhost:8080/photosGoods/${imageIdToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Видалення успішне - оновіть стан товару, видаливши зображення з масиву photosGoods
        const updatedPhotos = good.photosGoodsDTOS.filter((photo, i) => i !== index);
        setGood({
          ...good,
          photosGoodsDTOS: updatedPhotos,
        });
      } else {
        // Обробка помилки, якщо видалення не вдалося
        console.error('Помилка при видаленні зображення:', response.statusText);
      }
    } catch (error) {
      // Обробка помилки при взаємодії з сервером
      console.error('Помилка при взаємодії з сервером:', error);
    }
  };


  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!selectedFile) {
  //     console.error('Файл не вибрано');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('description', description);
  //   formData.append('file', selectedFile);
  //   formData.append('goodsId', id);

  //   // try {
  //   //   const response = await fetch('http://localhost:8080/photosGoods', {
  //   //     method: 'POST',
  //   //     body: formData,
  //   //   });

  //   //   if (response.ok) {
  //   //     // Зображення успішно завантажено
  //   //     console.log('Зображення успішно завантажено');
  //   //     updateGood(); // Оновлення даних товару
  //   //   } else {
  //   //     // Обробка помилки при завантаженні зображення
  //   //     console.error('Помилка при завантаженні зображення:', response.statusText);
  //   //   }
  //   // } catch (error) {
  //   //   // Обробка помилки при взаємодії з сервером
  //   //   console.error('Помилка при взаємодії з сервером:', error);
  //   // }
  //   try {
  //     const response = await fetch('http://localhost:8080/photosGoods', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       // Зображення успішно завантажено
  //       console.log('Зображення успішно завантажено');
  //       setImageUrl(null); // Обнулення URL зображення
  //       setSelectedFile(null); // Обнулення вибраного файлу
  //       setDescription(''); // Обнулення опису файлу
  //       updateGood(); // Оновлення даних товару
  //     } else {
  //       // Обробка помилки при завантаженні зображення
  //       console.error('Помилка при завантаженні зображення:', response.statusText);
  //     }
  //   } catch (error) {
  //     // Обробка помилки при взаємодії з сервером
  //     console.error('Помилка при взаємодії з сервером:', error);
  //   }
  //   // Очищення полів форми
  //   setDescription('');
  //   setSelectedFile(null);
  //   setImageUrl(null); // Обнулення URL зображення
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      console.error('Файл не вибрано');
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('file', selectedFile);
    formData.append('goodsId', id);

    try {
      const response = await fetch('http://localhost:8080/photosGoods', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Зображення успішно завантажено
        console.log('Зображення успішно завантажено');
        // Після успішного завантаження зображення та оновлення товару, обнуліть значення selectedFile:
        updateGood(); // Оновлення даних товару
        setSelectedFile(null); // Обнулення вибраного файлу
        setDescription(''); // Обнулення опису файлу
        setImageUrl(null); // Обнулення URL зображення

      } else {
        // Обробка помилки при завантаженні зображення
        console.error('Помилка при завантаженні зображення:', response.statusText);
      }
    } catch (error) {
      // Обробка помилки при взаємодії з сервером
      console.error('Помилка при взаємодії з сервером:', error);
      // Обнулення полів форми та URL зображення
      setSelectedFile(null);
      setImageUrl(null);
    }

    // Очищення полів форми
    setDescription('');
  };



  if (!good) {
    return <p>Loading...</p>;
  }

  // const handleChangeGood = useCallback(e => {
  //   setGood(e.target.value);
  // }, []);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ width: '50%', marginLeft: '20px', marginTop: '35px' }}>
        <div>
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
        </div>
        <div>
          <TextField
            required
            label="Короткий опис"
            multiline
            rows={4}
            value={good.short_discription ?? ''}
            InputProps={{
              readOnly: true,
            }}
            sx={{ width: '100%', paddingBottom: '20px' }}
          />
        </div>
        <div>
          <TextField
            required
            label="Підкатегорія"
            multiline
            value={good.subcategoriesGoodsName ?? ''}
            InputProps={{
              readOnly: true,
            }}
            sx={{ width: '100%', paddingBottom: '20px' }}
          />
        </div>
        <div>
          {imageUrl && (
            <img src={imageUrl} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label className="custom-file-upload">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            Завантажити фото
          </label>
          <div>
            <TextField
              required
              label="Опис фото"
              multiline
              value={description}
              onChange={e => setDescription(e.target.value)}
              sx={{ width: '100%', paddingBottom: '20px' }}
            />
          </div>

          <Button type="submit" variant="contained">Додати фото</Button>
        </form>
      </div>
      <div style={{ width: '50%' }} className="carousel-container">
        <Carousel>
          {good.photosGoodsDTOS.map((image, index) => (
            <div key={index}>
              <img src={image.path} alt={`Image ${index + 1}`} />
              <button onClick={() => handleDeleteImage(index)} className='buttonCarousel'>Видалити</button>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default forwardRef((props, ref) => <Addphotosgood {...props} forwardRef={ref} />);
