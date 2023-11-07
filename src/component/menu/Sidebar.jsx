// import React, { useState } from "react";
// import {
//     FaTh, FaShopify, FaRegChartBar, FaThList, FaAd, FaBars, FaShip, FaClipboardList,
//     FaWpforms, FaCashRegister,
// } from "react-icons/fa"
// import { MdShop2, } from "react-icons/md";
// import { NavLink } from "react-router-dom";

// const Sidebar = ({ children }) => {

//     const [isOpen, setIsOpen] = useState(false)
//     const toggle = () => setIsOpen(!isOpen)
//     const menuItem = [
//         {
//             path: "/",
//             name: "Введені товари",
//             icon: <FaTh />
//         },
//         // {
//         //     path: "/viewgoods",
//         //     name: "ViewGoods",
//         //     icon: <FaThList />
//         // },
//         {
//             path: "/viewonegood",
//             // name: "ViewOneGood",
//             name: "Перегляд товару",
//             icon: <MdShop2 />
//         },
//         // {
//         //     path: "/viewscsubcategoriesgoods",
//         //     // name: "ViewscSubcategoriesGoods",
//         //     name: "Перегляд підкатегорій",
//         //     icon: <FaRegChartBar />
//         // },
//         {
//             path: "/viewsubcategories",
//             // name: "ViewscSubcategories",
//             name: "Перегляд підкатегорій",
//             icon: <FaWpforms />
//         },
//         {
//             path: "/viewcategories",
//             // name: "ViewСategories",
//             name: "Перегляд категорій",
//             icon: <FaWpforms />
//         },
//         {
//             path: "/addcategory",
//             // name: "AddCategory",
//             name: "Додати категорію товару",
//             icon: <FaAd />
//         },
//         {
//             path: "/addsubcategory",
//             // name: "AddSubcategory",
//             name: "Додати підкатегорію товару",
//             icon: <FaAd />
//         },
//         {
//             path: "/addgood",
//             // name: "AddGood",
//             name: "Додати товар",
//             icon: <FaAd />
//         },
//         {
//             path: "/addphotosgood",
//             // name: "AddPhotosgood",
//             name: "Додати зображення товару",
//             icon: <FaAd />
//         },
//         {
//             path: "/addproperties",
//             // name: "AddProperties",
//             name: "Додати властивості товару",
//             icon: <FaAd />
//         },
//         {
//             path: "/addpropertiesbycategory",
//             // name: "AddPropertiesByCategory",
//             name: "Перелік властивостей для підкатегорій",
//             icon: <FaAd />
//         },
//         {
//             path: "/addgoodtoshop",
//             // name: "AddGoodToShop",
//             name: "Додати товар в магазин",
//             icon: <FaClipboardList />
//         },
//         {
//             path: "/viewgoodsinshop",
//             // name: "Viewgoodsinshop",
//             name: "Магазин",
//             icon: <FaShopify />
//         },
//         {
//             path: "/viewonegoodinshop",
//             // name: "Viewonegoodinshop",
//             name: "Все про товар",
//             icon: <FaCashRegister />
//         },
//         {
//             path: "/addcommentform",
//             // name: "AddCommentForm",
//             name: "AddCommentForm",
//             icon: <FaAd />
//         },
//         {
//             path: "/addcomments",
//             name: "Comments",
//             icon: <FaAd />
//         }


//     ]
//     return (
//         <div className="container">
//             <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
//                 <div className="top_section">
//                     <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</h1>
//                     <div style={{marginLeft: isOpen? "50px" :"0px"}} className="bars">
//                         <FaBars onClick={toggle} />
//                     </div>
//                 </div>
//                 {
//                     menuItem.map((item, index) => (
//                         <NavLink to={item.path} key={index} className="link" activeclassname="active">
//                             <div className="icon">{item.icon}</div>
//                             <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
//                         </NavLink>
//                     ))
//                 }
//             </div>
//             <main style={{paddingLeft: isOpen? "250px" :"50px"}}>{children}</main>
//         </div>
//     )
// }
// export  { Sidebar }

/////////////////////////////////////////////////////////////////
//  Робоче меню 03/11/2023

// import React, { useState } from "react";
// import RoutesForManager from "../../routes/manager/RoutesForManager"
// import { NavLink } from "react-router-dom";
// import { FaBars } from "react-icons/fa"
// const Sidebar = ({ children }) => {

//     const [isOpen, setIsOpen] = useState(false)
//     const toggle = () => setIsOpen(!isOpen)
//     const menuItem = RoutesForManager.map((route) => ({
//         path: route.path,
//         element: route.element,
//         name: route.name,
//         icon: route.icon
//       }));

//     return (
//         <div className="container">
//             <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
//                 <div className="top_section">
//                     <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</h1>
//                     <div style={{marginLeft: isOpen? "50px" :"0px"}} className="bars">
//                         <FaBars onClick={toggle} />
//                     </div>
//                 </div>
//                 {
//                     menuItem.map((item, index) => (
//                         <NavLink to={item.path} key={index} className="link" activeclassname="active">
//                             <div className="icon">{item.icon}</div>
//                             <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
//                         </NavLink>
//                     ))
//                 }
//             </div>
//             <main style={{paddingLeft: isOpen? "250px" :"50px"}}>{children}</main>
//         </div>
//     )
// }
// export  { Sidebar }

//  Робоче меню 03/11/2023
/////////////////////////////////////////////////////////////////


import React, { useState } from "react";
// import RoutesForManager from "../../routes/manager/RoutesForManager"
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa"
const Sidebar = ({ children, menuRoutes }) => {

    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)
    const menuItem = menuRoutes.map((route) => ({
        path: route.path,
        element: route.element,
        name: route.name,
        icon: route.icon
    }));

    return (
        <div className="container">
            <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassname="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main style={{ paddingLeft: isOpen ? "250px" : "50px" }}>{children}</main>
        </div>
    )
}
export { Sidebar }