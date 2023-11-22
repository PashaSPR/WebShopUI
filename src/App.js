//////////////////////////////////////////////////////////////////////////////////////////////////
// import React from 'react';
// import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import './App.css';
// import Viewgoods from './component/good/Viewgoods';
// import Addgood from './component/good/Addgood';
// // import Viewsubcategoriesgoods from './component/subcategory/Viewsubcategoriesgoods';
// import Viewsubcategories from './component/subcategory/ViewSubcategoriesComponent';
// import Viewcategories from './component/category/ViewCategoriesComponent';
// import Viewonegood from './component/good/Viewonegood';
// import Addphotosgood from './component/good/Addphotosgood';
// import Notfoundpage from './pages/Notfoundpage';
// import AddProperties from './property/AddPropertiesComponent';
// import AddPropertiesByCategory from './property/AddPropertiesByCategoryComponent';
// import AddCategory from './component/category/AddCategoriesComponent';
// import AddSubcategory from './component/subcategory/AddSubcategoriesComponent';
// import AddGoodToShop from './component/shop/AddGoodToShopComponent';
// import Viewgoodsinshop from './component/shop/ViewgoodsinshopComponent'
// import Viewonegoodinshop from './component/shop/ViewonegoodinshopComponent'
// import AddCommentForm from './component/comment/AddCommentForm'
// import Comments from './component/comment/Comments'

// // import { Layout } from './component/Layout';
// // import Layout from './component/Layout';
// import { Sidebar } from './component/menu/Sidebar';
// import { FaComments } from 'react-icons/fa';
// // import Sidebar from './component/Sidebar';


// function App() {
//   return (
//     // <BrowserRouter>
//       <Sidebar>
//         <Routes>
//           {/* <Route path='/' element={<Layout />}> */}
//             <Route index element={<Viewgoods />} />
//             <Route path='addgood' element={<Addgood />} />
//             <Route path='viewgoods' element={<Viewgoods />} />
//             <Route path='viewonegood/:id' element={<Viewonegood />} />
//             {/* <Route path='viewsubcategoriesgoods' element={<Viewsubcategoriesgoods />} /> */}
//             <Route path='viewcategories' element={<Viewcategories />} />
//             <Route path='viewsubcategories' element={<Viewsubcategories />} />
//             <Route path='addphotosgood/:id' element={<Addphotosgood />} />
//             <Route path='addproperties' element={<AddProperties />} />
//             <Route path='addpropertiesbycategory/:id' element={<AddPropertiesByCategory />} />
//             <Route path='addcategory' element={<AddCategory />} />
//             <Route path='addsubcategory' element={<AddSubcategory />} />
//             <Route path='addgoodtoshop' element={<AddGoodToShop />} />
//             <Route path='viewgoodsinshop' element={<Viewgoodsinshop />} />
//             <Route path='viewonegoodinshop/:id' element={<Viewonegoodinshop />} />
//             <Route path='addcommentform' element={<AddCommentForm />} />
//             <Route path='comments' element={<Comments />} />

//             <Route path='/*' element={<Notfoundpage />} />
//           {/* </Route> */}
//         </Routes>
//       </Sidebar>
//     // </BrowserRouter>
//   );
// }

// export default App;



//////////////////////////////////////////////////////////////////////////////////


// import React from 'react';
// import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import './App.css';
// import Viewgoods from './component/good/Viewgoods';
// import Addgood from './component/good/Addgood';
// // import Viewsubcategoriesgoods from './component/subcategory/Viewsubcategoriesgoods';
// import Viewsubcategories from './component/subcategory/ViewSubcategoriesComponent';
// import Viewcategories from './component/category/ViewCategoriesComponent';
// import Viewonegood from './component/good/Viewonegood';
// import Addphotosgood from './component/good/Addphotosgood';
// import Notfoundpage from './pages/Notfoundpage';
// import AddProperties from './property/AddPropertiesComponent';
// import AddPropertiesByCategory from './property/AddPropertiesByCategoryComponent';
// import AddCategory from './component/category/AddCategoriesComponent';
// import AddSubcategory from './component/subcategory/AddSubcategoriesComponent';
// import AddGoodToShop from './component/shop/AddGoodToShopComponent';
// import Viewgoodsinshop from './component/shop/ViewgoodsinshopComponent'
// import Viewonegoodinshop from './component/shop/ViewonegoodinshopComponent'
// import AddCommentForm from './component/comment/AddCommentForm'
// import Comments from './component/comment/Comments'

// // import { Layout } from './component/Layout';
// // import Layout from './component/Layout';
// import { Sidebar } from './component/menu/Sidebar';
// import { FaComments } from 'react-icons/fa';
// // import Sidebar from './component/Sidebar';


// function App() {
//   return (
//     // <BrowserRouter>
//       <Sidebar>

// <Routes>
//   <Route
//     path='/seller'
//     element={
//       <div>
//         <Route path='addgood' element={<Addgood />} />
//         <Route path='viewgoods' element={<Viewgoods />} />
//         <Route path='viewonegood/:id' element={<Viewonegood />} />
//         <Route path='viewcategories' element={<Viewcategories />} />
//         <Route path='viewsubcategories' element={<Viewsubcategories />} />
//         <Route path='addphotosgood/:id' element={<Addphotosgood />} />
//         <Route path='addproperties' element={<AddProperties />} />
//         <Route path='addpropertiesbycategory/:id' element={<AddPropertiesByCategory />} />
//         <Route path='addcategory' element={<AddCategory />} />
//         <Route path='addsubcategory' element={<AddSubcategory />} />
//         <Route path='addgoodtoshop' element={<AddGoodToShop />} />
//       </div>
//     }
//   />
//   <Route
//     path='/shop'
//     element={
//       <div>
//         <Route path='viewgoodsinshop' element={<Viewgoodsinshop />} />
//         <Route path='viewonegoodinshop/:id' element={<Viewonegoodinshop />} />
//       </div>
//     }
//   />
//   {/* Додайте інші роути, які не входять в жодну з груп */}
//   <Route path='/addcommentform' element={<AddCommentForm />} />
//   <Route path='/comments' element={<Comments />} />
//   <Route path='/*' element={<Notfoundpage />} />
// </Routes>


//       </Sidebar>
//     // </BrowserRouter>
//   );
// }

// export default App;

////////////////////////////////////////////////////////////////////////////////////


import React, { createContext, Suspense, useEffect, useMemo, useState } from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CircularProgress } from "@mui/material";
import { Sidebar } from "./component/menu/Sidebar";
// import { Navmenu } from "./component/menu/Navmenu";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
// import Header from "./components/elements/header/header";
import NotFoundPage from "./pages/Notfoundpage";
import AdminRoutes from "./routes/admin/AdminRoutes";
import RoutesForAdmin from "./routes/admin/RoutesForAdmin";
import ManagerRoutes from "./routes/manager/ManagerRoutes";
import RoutesForManager from "./routes/manager/RoutesForManager";
import CustomerRoutes from "./routes/customer/CustomerRoutes";
import RoutesForCustomer from "./routes/customer/RoutesForCustomer";
import routes from "./routes/customer/CustomerRoutes"; ///???????????????????????????????

// import clientRoutesConcat from "./routes/clientRoutes";
// import jwt_decode from "jwt-decode";
// import adminRoutesConcat from "./routes/adminRoutes";

export const AppContext = createContext({});

function App() {
  // const [authenticated, setAuthenticated] = useState(localStorage.getItem("token"));
  const [authenticated, setAuthenticated] = useState(true);
  // const location = useLocation();
  // const navigate = useNavigate();
  const roles ="ROLE_CUSTOMER";

  const getMenuRoutes = () => {
    switch (true) {
      case roles.includes("ROLE_MANAGER"):
        return RoutesForManager; // Маршрути для ролі "Manager"
      case roles.includes("ROLE_CUSTOMER"):
        return RoutesForCustomer; // Маршрути для ролі "Customer"
      case roles.includes("ROLE_ADMIN"):
        return RoutesForAdmin; // Маршрути для ролі "Admin"
      default:
        return routes; // За замовчуванням
    }
  };

  const authRouteRender = () => {
    if (!authenticated) {
      return (
        routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))
      );
    } else {
      // const { roles } = jwt_decode(localStorage.getItem("token"));
      let roleRoutes;
      switch (true) {
        // case roles.includes("ROLE_MANAGER"): roleRoutes = ManagerRoutes; break;
        // case roles.includes("ROLE_CUSTONER"): roleRoutes = CustomerRoutes; break;
        // case roles.includes("ROLE_ADMIN"): roleRoutes = AdminRoutes; break;
        case roles.includes("ROLE_MANAGER"): roleRoutes = ManagerRoutes; break;
        case roles.includes("ROLE_CUSTOMER"): roleRoutes = CustomerRoutes; break;
        case roles.includes("ROLE_ADMIN"): roleRoutes = AdminRoutes; break;
        // default: roleRoutes = ManagerRoutes; break;
        default: roleRoutes = routes; break;
      }
      return (
        roleRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))
      );
    }
  };

  useMemo(() => {
    nprogress.start();
  }, []);

  useEffect(() => {
    nprogress.done();
  }, []);

  return (
    <AppContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        timeZone: new Date().getTimezoneOffset(),
      }}
    >
      <HelmetProvider>
        {/* <Header /> */}
        <div className="container" >
          <Suspense fallback={<CircularProgress />}>
            <Sidebar menuRoutes={getMenuRoutes()}>
              <Routes>
                {authRouteRender()}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Sidebar>             
          </Suspense>
        </div>
      </HelmetProvider>
    </AppContext.Provider>
  );
}

export default App;

