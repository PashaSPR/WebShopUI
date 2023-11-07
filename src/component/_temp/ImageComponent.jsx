// import React, { useEffect, useState } from 'react';

// const ImageComponent = () => {
//     const [imageURL, setImageURL] = useState('');

//     useEffect(() => {
//         // Виконати запит до серверного API для отримання посилання на зображення
//         fetch('http://localhost:8080/api/images/40fafac2-c681-4086-917d-6f624ad05b97.png')
//             .then(response => response.text())
//             .then(data => setImageURL(data))
//             .catch(error => console.log(error));
//     }, []);

//     return (
//         <div>
//             <img src={imageURL} alt="Зображення" />
//         </div>
//     );
// };

// export default ImageComponent;