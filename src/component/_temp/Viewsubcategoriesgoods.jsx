// // import React, { Component } from 'react'

// // export default class Viewscsubcategoriesgoods extends Component {
// //     constructor(props) {
// //         super(props)
// //         this.state = {
// //             error: null,
// //             isLoaded: false,
// //             items: []
// //         }
// //     }

// //     componentDidMount() {
// //         fetch("http://localhost:8080/subcategoriesGoods")
// //             .then(res => res.json())
// //             .then(
// //                 (result) => {
// //                     this.setState({
// //                         isLoaded: true,
// //                         items: result
// //                     })
// //                 },
// //                 (error) => {
// //                     this.setState({
// //                         isLoaded: true,
// //                         error
// //                     })
// //                 }
// //             )
// //     }

// //     render() {
// //         const { error, isLoaded, items } = this.state
// //         if (error) {
// //             return <p>Error {error.message}</p>
// //         } else if (!isLoaded) {
// //             return <p>Loading...</p>
// //         } else {
// //             return (
// //                 <div>
// //                     <ul>
// //                         {items.map(item => (
// //                             <li key={item.id}>
// //                                 {item.name}
// //                             </li>
// //                         ))}
// //                     </ul>

// //                 </div>
// //             )
// //         }

// //     }
// // }


// import React, { Component } from 'react';

// export default class Viewsubcategoriesgoods extends Component {
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
//                         items: result
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
//         const { error, isLoaded, items } = this.state;
//         if (error) {
//             throw new Error(error.message); // Генерувати виключення для зупинки виконання і відображення помилки
//         } else if (!isLoaded) {
//             return <p>Loading...</p>;
//         } else {
//             return (
//                 <div>Viewscsubcategoriesgoods
//                     <ul>
//                         {items.map(item => (
//                             <li key={item.name}>{item.name}</li>
//                         ))}
//                     </ul>
//                 </div>
//             );
//         }
//     }
// }