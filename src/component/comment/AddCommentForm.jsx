// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import CommentsList from './CommentsList';
// import { Button, Container, TextField, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, Grid, Typography, Rating } from '@mui/material';

// function AddCommentForm() {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const goodsIdFromURL = queryParams.get('goodsId');

//   const [usersListsId, setUsersListsId] = useState('');
//   const [products, setProducts] = useState([]); // Список товарів
//   const [selectedProduct, setSelectedProduct] = useState(goodsIdFromURL || ''); // Вибраний товар
//   const [comment, setComment] = useState('');
//   const [rating, setRating] = useState(0);

//   useEffect(() => {
//     axios.get('http://localhost:8080/goods')
//       .then(response => {
//         setProducts(response.data); // Зберегти список товарів у стані
//       })
//       .catch(error => {
//         console.error('Error fetching products:', error);
//       });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:8080/comments', {
//         usersListsId,
//         goodsId: selectedProduct,
//         comment,
//         rating,
//       });

//       console.log('Comment added:', response.data);

//       // Очистити поля після додавання коментаря
//       setUsersListsId('');
//       setSelectedProduct(goodsIdFromURL || ''); // Встановити значення товару на основі параметрів URL
//       setComment('');
//       setRating(0);
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

//   return (
//     <Container maxWidth="md" style={{ marginTop: '20px' }}>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Users Lists ID"
//               type="number"
//               value={usersListsId}
//               onChange={(e) => setUsersListsId(e.target.value)}
//               required
//             />
           
//           </Grid>
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel>Product</InputLabel>
//               <Select
//                 value={selectedProduct}
//                 onChange={(e) => setSelectedProduct(e.target.value)}
//                 required
//                 disabled
//               >
//                 <MenuItem value="">Select a product</MenuItem>
//                 {products.map(product => (
//                   <MenuItem key={product.id} value={product.id}>
//                     {product.name}
//                   </MenuItem>
//                 ))}
//               </Select>
             
//             </FormControl>
//           </Grid>
//           <Grid item xs={12}>
//             <TextareaAutosize
//               minRows={3}
//               maxRows={6}
//               className="full-width-textarea"
//               placeholder="Comment"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               required
//             />
            
//           </Grid>
//           <Grid item xs={12}>
//             <Typography></Typography>
//             <Rating
//               value={rating}
//               onChange={(e, newRating) => setRating(newRating)}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary">
//               Add Comment
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//       {selectedProduct && <CommentsList goodsId={selectedProduct} />}
//     </Container>
//   );
// }

// export default AddCommentForm;


/////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CommentsList from "./CommentsList";
import {
  Button,
  Container,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  Grid,
  Typography,
  Rating,
} from "@mui/material";

function AddCommentForm() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const goodsIdFromURL = queryParams.get("goodsId");

  const [usersListsId, setUsersListsId] = useState("");
  const [products, setProducts] = useState([]); // Список товарів
  const [goodsId, setGoodsId] = useState(goodsIdFromURL || ""); // Вибраний товар
  const [comment, setComment] = useState("");

  useEffect(() => {
    // Отримання даних про товар з сервера
    fetch(`http://localhost:8080/goods/getOne?id=${goodsId}`)
      .then((res) => res.json())
      .then((data) => {
        // Перевірка, чи отримані дані не є null
        if (data) {
          setProducts(data);
        } else {
          console.error("Дані про товар отримано в null");
        }
      })
      .catch((error) =>
        console.error("Помилка отримання даних про товар:", error)
      );
  }, [goodsId]);

  // useEffect(() => {
  //   // Отримання даних про товар з сервера
  //   axios
  //     .get(`http://localhost:8080/goods/getOne?id=${goodsId}`)
  //     .then((response) => {
  //       const data = response.data;
  //       // Перевірка, чи отримані дані не є null
  //       if (data) {
  //         setProducts(data);
  //       } else {
  //         console.error('Дані про товар отримано в null');
  //       }
  //     })
  //     .catch((error) => console.error('Помилка отримання даних про товар:', error));
  // }, [goodsId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/comments", {
        usersListsId,
        goodsId: goodsId,
        comment,
        // rating,
      });

      console.log("Коментар додано:", response.data);

      // Очистити поля після додавання коментаря
      setUsersListsId("");
      setGoodsId(goodsIdFromURL || ""); // Встановити значення товару на основі параметрів URL
      setComment("");
      // setRating(0);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="ID користувача"
              type="number"
              value={usersListsId}
              onChange={(e) => {
                const value = e.target.value;
                // Перевіряємо, чи введене значення не є від'ємним числом
                if (value >= 1) {
                  setUsersListsId(value);
                }
              }}
              // }setUsersListsId(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
          
            <div>
              <TextField
                readOnly
                required
                label="Назва товару"
                multiline
                value={products.name ?? ""}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ width: "100%", paddingBottom: "20px" }}
              />
            </div>
            <div style={{ display: 'flex'}}>
              <div
                style={{
                  // Збільшуємо розміри зображення на 10% вище і вставляємо його в центр
                  paddingTop: "10%", // Збільшуємо висоту до 75% (пропорція 4:3)
                  margin: "10px",
                  backgroundImage: `url(${
                    products.photosGoodsDTOS &&
                    products.photosGoodsDTOS.length > 0
                      ? products.photosGoodsDTOS[0].path
                      : "https://source.unsplash.com/random?wallpapers"
                  })`,
                  backgroundSize: "contain", // Вмістити зображення в контейнер
                  backgroundRepeat: "no-repeat", // Заборонити повторення фону
                  backgroundPosition: "left", // Вирівняти зображення по центру
                  width: '20%',
                }}
              
              />
              <div style={{paddingTop:"10px"}} >
                <Typography>Оцінка товару</Typography>
                <Rating readOnly value={products.evaluation ?? 0} />                
              </div>
            </div>
          </Grid>

          <Grid item xs={12}>
            <TextareaAutosize
              minRows={3}
              maxRows={6}
              className="full-width-textarea"
              placeholder="Коментар"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Додати коментар
            </Button>
          </Grid>
        </Grid>
      </form>
      {goodsId && <CommentsList goodsId={goodsId} />}
    </Container>
  );
}

export default AddCommentForm;