// import React, { Component } from 'react'
// import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// export default class AddPropertiesByCategoryComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         error: null,
//         isLoaded: false,
//         id: '',
//         subcategory: null
//     };
// }
// componentDidMount() {
//   const id = this.props.match.params.id; // або іншим чином отримайте id з URL
//   fetch(`http://localhost:8080/subcategoriesGoods/getOne?id=${id}`)
//       .then(res => res.json())
//       .then(
//           result => {
//               this.setState({
//                   isLoaded: true,
//                   subcategory: result
//               });
//           },
//           error => {
//               this.setState({
//                   isLoaded: true,
//                   error
//               });
//           }
//       );
// }
//   // render() {
//   //   return (
//   //     <div style={{ display: 'flex', gap: '20px' }}>
//   //     <div style={{ width: '50%', marginLeft: '20px', marginTop: '35px' }}>
//   //       <div>
//   //         <TextField
//   //           required
//   //           label="Name Good"
//   //           multiline
//   //           value={subcategory ? subcategory.name : ''}
//   //           InputProps={{
//   //             readOnly: true,
//   //           }}
//   //           sx={{ width: '100%', paddingBottom: '20px' }}
//   //         />
//   //       </div>
//   //       {/* <form onSubmit={handleSubmit}>
//   //         <div>
//   //           <input type="file" accept="image/*" onChange={handleFileChange} />
//   //         </div>
//   //         <Button type="submit" variant="contained">Add Photo</Button>
//   //       </form> */}
//   //     </div>
//   //   </div>
//   //   )
//   // }

//   render() {
//     const { subcategory } = this.state; // Деструктуризація змінної subcategory зі стану
//     return (
//       <div style={{ display: 'flex', gap: '20px' }}>
//         <div style={{ width: '50%', marginLeft: '20px', marginTop: '35px' }}>
//           <div>
//             <TextField
//               required
//               label="Name Good"
//               multiline
//               value={subcategory.name ?? ''}
//               InputProps={{
//                 readOnly: true,
//               }}
//               sx={{ width: '100%', paddingBottom: '20px' }}
//             />
//           </div>
//           {/* <form onSubmit={handleSubmit}>
//             <div>
//               <input type="file" accept="image/*" onChange={handleFileChange} />
//             </div>
//             <Button type="submit" variant="contained">Add Photo</Button>
//           </form> */}
//         </div>
//       </div>
//     );
//   }
// }

// /////////////////////////////////////2023.08.14//////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { TextField, Button } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

// export default function AddPropertiesByCategoryComponent() {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [subcategory, setSubcategory] = useState(null);
//   const [properties, setProperties] = useState([]);
//   const [selectedProperties, setSelectedProperties] = useState([]);

//   const { id } = useParams(); // Використовуємо useParams для отримання параметрів з URL

//   useEffect(() => {
//     fetch(`http://localhost:8080/subcategoriesGoods/getOne?id=${id}`)
//       .then(res => res.json())
//       .then(
//         result => {
//           setIsLoaded(true);
//           setSubcategory(result);
//         },
//         error => {
//           setIsLoaded(true);
//           setError(error);
//         }
//       );
//     fetch('http://localhost:8080/propertiesNameGoods')
//       .then(res => res.json())
//       .then(
//         result => {
//           if (Array.isArray(result)) {
//             setProperties(result); // Зберігаємо результат властивостей в стан
//           } else {
//             console.error('Received data is not an array:', result);
//           }
//         },
//         error => {
//           setError(error);
//         }
//       );
//   }, [id]);


//   const handlePropertyChange = (propertyId) => {
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
//       // Відправте запит на сервер для створення властивостей та додавання їх до підкатегорії
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


//   if (error) {
//     return <div>Error: {error.message}</div>;
//   } else if (!isLoaded) {
//     return <div>Loading...</div>;
//   } else {
//     return (
//       <div style={{ display: 'flex', gap: '20px' }}>
//         <div style={{ width: '50%', marginLeft: '20px', marginTop: '35px' }}>
//           <div>
//             <TextField
//               required
//               label="Name Subcategory"
//               multiline
//               value={subcategory.name ?? ''}
//               InputProps={{
//                 readOnly: true,
//               }}
//               sx={{ width: '100%', paddingBottom: '20px' }}
//             />
//           </div>

//           <div style={{ display: 'flex' }}>
//             <div style={{ marginLeft: '20px' }}>
//               <h3>Перелік вибраних власностей:</h3>
//               <ul style={{ marginLeft: '20px' }}>
//                 {selectedProperties.map((propertyId) => {
//                   const property = properties.find((p) => p.id === propertyId);
//                   return <li key={propertyId}>{property.name}</li>;
//                 })}
//                 {subcategory.propertiesNameGoodsDTOS.map((property) => (
//                   <li key={property.id}>{property.name}</li>
//                 ))}
//               </ul>
//             </div>
//             <div style={{ marginLeft: '50px' }}>
//               <Button variant="contained" color="success" onClick={handleClick}>
//                 Save Property
//               </Button>
//             </div>
//           </div>
//         </div>
//         <div style={{ maxHeight: '73vh', overflowY: 'auto' }}> {/* Стилі для блоку */}

//           <FormGroup>
//             {properties.map((property) => (
//               <FormControlLabel
//                 key={property.id}
//                 control={
//                   <Checkbox
//                     checked={
//                       selectedProperties.includes(property.id) ||
//                       subcategory.propertiesNameGoodsDTOS.some((prop) => prop.id === property.id)
//                     }
//                     disabled={subcategory.propertiesNameGoodsDTOS.some((prop) => prop.id === property.id)}
//                     onChange={() => handlePropertyChange(property.id)}
//                   />
//                 }
//                 label={property.name}
//               />
//             ))}
//           </FormGroup>
//         </div>
//       </div>
//     );
//   }
// }



/////////////////////////////////////2023.08.15//////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AddPropertiesByCategoryComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [subcategory, setSubcategory] = useState(null);
  const [properties, setProperties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);

  const { id } = useParams(); // Використовуємо useParams для отримання параметрів з URL

  useEffect(() => {
    fetch(`http://localhost:8080/subcategoriesGoods/getOne?id=${id}`)
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setSubcategory(result);
        },
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
    fetch('http://localhost:8080/propertiesNameGoods')
      .then(res => res.json())
      .then(
        result => {
          if (Array.isArray(result)) {
            setProperties(result); // Зберігаємо результат властивостей в стан
          } else {
            console.error('Received data is not an array:', result);
          }
        },
        error => {
          setError(error);
        }
      );
  }, [id]);


  const handlePropertyChange = (propertyId) => {
    console.log("handlePropertyChange called with propertyId:", propertyId);
    if (selectedProperties.includes(propertyId)) {
      setSelectedProperties(selectedProperties.filter((id) => id !== propertyId));
    } else {
      setSelectedProperties([...selectedProperties, propertyId]);
    }
  };


  const handleClick = async (e) => {
    console.log("handleClick called");
    e.preventDefault();

    const propertiesToSave = selectedProperties;

    try {
      // Запит на сервер для створення властивостей та додавання їх до підкатегорії
      // console.log("handleClick-propertiesToSave: " + propertiesToSave);
      // console.log("handleClick-id: " + id);
      const response = await fetch(`http://localhost:8080/subcategoriesGoods/${id}/addProperties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertiesToSave),
      });

      if (response.ok) {
        // Додаткові дії після успішного збереження
        console.log('Вибрані властивості збережено успішно');
      } else {
        const errorMessage = await response.text();
        console.error('Помилка при збереженні вибраних властивостей:', errorMessage);
      }
    } catch (error) {
      console.error('Помилка при відправленні запиту на сервер:', error);
    }
  };


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    const selectedSubcategoryProperties = subcategory.propertiesNameGoodsDTOS;
    const selectedCheckboxProperties = properties.filter(property => selectedProperties.includes(property.id));

    return (
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ width: '50%', marginLeft: '20px', marginTop: '35px' }}>
          <div>
            <TextField
              required
              label="Name Subcategory"
              multiline
              value={subcategory.name ?? ''}
              InputProps={{
                readOnly: true,
              }}
              sx={{ width: '100%', paddingBottom: '20px' }}
            />
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: '20px' }}>
              <h3>Перелік вибраних властивостей:</h3>
              <ul style={{ marginLeft: '20px' }}>
                {selectedSubcategoryProperties.map(property => (
                  <li key={property.id} style={{ color: 'grey' }}>{property.name}</li>
                ))}
                {selectedCheckboxProperties.map(property => (
                  <li key={property.id}>{property.name}</li>
                ))}
              </ul>
            </div>
            <div style={{ marginLeft: '50px' }}>
              <Button variant="contained" color="success" onClick={handleClick}>
                Save Property
              </Button>
            </div>
          </div>
        </div>
        <div style={{ maxHeight: '73vh', overflowY: 'auto' }}> {/* Стилі для блоку */}

          <FormGroup>
            {properties.map((property) => (
              <FormControlLabel
                key={property.id}
                control={
                  <Checkbox
                    checked={
                      selectedProperties.includes(property.id) ||
                      subcategory.propertiesNameGoodsDTOS.some((prop) => prop.id === property.id)
                    }
                    disabled={subcategory.propertiesNameGoodsDTOS.some((prop) => prop.id === property.id)}
                    onChange={() => handlePropertyChange(property.id)}
                  />
                }
                label={property.name}
              />
            ))}
          </FormGroup>
        </div>
      </div>
    );
  }
}


// import React, { useState, useEffect } from 'react';
// import { TextField, Button } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

// export default function AddPropertiesByCategoryComponent() {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [subcategory, setSubcategory] = useState(null);
//   const [properties, setProperties] = useState([]);
//   const [selectedProperties, setSelectedProperties] = useState([]);

//   const { id } = useParams();

//   useEffect(() => {
//     fetch(`http://localhost:8080/subcategoriesGoods/getOne?id=${id}`)
//       .then(res => res.json())
//       .then(
//         result => {
//           setIsLoaded(true);
//           setSubcategory(result);
//         },
//         error => {
//           setIsLoaded(true);
//           setError(error);
//         }
//       );
//     fetch('http://localhost:8080/propertiesNameGoods')
//       .then(res => res.json())
//       .then(
//         result => {
//           if (Array.isArray(result)) {
//             setProperties(result);
//           } else {
//             console.error('Received data is not an array:', result);
//           }
//         },
//         error => {
//           setError(error);
//         }
//       );
//   }, [id]);

//   const handlePropertyChange = (propertyId) => {
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
//       const response = await fetch(`http://localhost:8080/subcategoriesGoods/${id}/addProperties`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(propertiesToSave),
//       });

//       if (response.ok) {
//         console.log('Вибрані властивості збережено успішно');
//       } else {
//         const errorMessage = await response.text();
//         console.error('Помилка при збереженні вибраних властивостей:', errorMessage);
//       }
//     } catch (error) {
//       console.error('Помилка при відправленні запиту на сервер:', error);
//     }
//   };

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   } else if (!isLoaded) {
//     return <div>Loading...</div>;
//   } else {
//     return (
//       <div style={{ display: 'flex', gap: '20px' }}>
//         <div style={{ width: '50%', marginLeft: '20px', marginTop: '35px' }}>
//           <div>
//             <TextField
//               required
//               label="Name Subcategory"
//               multiline
//               value={subcategory.name ?? ''}
//               InputProps={{
//                 readOnly: true,
//               }}
//               sx={{ width: '100%', paddingBottom: '20px' }}
//             />
//           </div>

//           <div style={{ display: 'flex' }}>
//             <div style={{ marginLeft: '50px' }}>
//               <Button variant="contained" color="success" onClick={handleClick}>
//                 Save Property
//               </Button>
//             </div>
//           </div>
//         </div>
//         <div style={{ maxHeight: '73vh', overflowY: 'auto' }}>
//           <FormGroup>
//             {properties.map((property) => (
//               <FormControlLabel
//                 key={property.id}
//                 control={
//                   <Checkbox
//                     checked={
//                       selectedProperties.includes(property.id) ||
//                       subcategory.propertiesNameGoodsDTOS.some((prop) => prop.id === property.id)
//                     }
//                     disabled={subcategory.propertiesNameGoodsDTOS.some((prop) => prop.id === property.id)}
//                     onChange={() => handlePropertyChange(property.id)}
//                   />
//                 }
//                 label={property.name}
//               />
//             ))}
//           </FormGroup>
//         </div>
//       </div>
//     );
//   }
// }
