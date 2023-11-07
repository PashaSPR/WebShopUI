// import { lazy } from "react";
// // import routes from "./routes";

// // const AdminPanelPage = lazy(() => import("../pages/admin/AdminPanelPage"));
// // const DoctorRegisterPage = lazy(() => import("../pages/admin/DoctorRegisterPage"));

// import {
//   FaTh, FaShopify, FaRegChartBar, FaThList, FaAd, FaBars, FaShip, FaClipboardList,
//   FaWpforms, FaCashRegister,
// } from "react-icons/fa"

// const Viewgoods = lazy(() => import("../component/good/Viewgoods"));
// const Addgood = lazy(() => import("../component/good/Addgood"));
// const ViewSubcategories = lazy(() => import("../component/subcategory/ViewSubcategoriesComponent"));
// const ViewCategories = lazy(() => import("../component/category/ViewCategoriesComponent"));
// const Viewonegood = lazy(() => import("../component/good/Viewonegood"));
// const Addphotosgood = lazy(() => import("../component/good/Addphotosgood"));
// const Notfoundpage = lazy(() => import("../pages/Notfoundpage"));
// const AddProperties = lazy(() => import("../property/AddPropertiesComponent"));
// const AddPropertiesByCategory = lazy(() => import("../property/AddPropertiesByCategoryComponent"));
// const AddCategories = lazy(() => import("../component/category/AddCategoriesComponent"));
// const AddSubcategories = lazy(() => import("../component/subcategory/AddSubcategoriesComponent"));
// const AddGoodToShop = lazy(() => import("../component/shop/AddGoodToShopComponent"));
// const Viewgoodsinshop = lazy(() => import("../component/shop/ViewgoodsinshopComponent"));
// const Viewonegoodinshop = lazy(() => import("../component/shop/ViewonegoodinshopComponent"));
// const AddCommentForm = lazy(() => import("../component/comment/AddCommentForm"));
// const Comments = lazy(() => import("../component/comment/Comments"));

// const SubRoutes = "/manager";

// const managerRoutes = [
//   {
//     path: SubRoutes + "/manager/view-goods",
//     element: <Viewgoods />,
//     name: "Перегляд товарів",
//     icon: <FaThList />
//   },
//   {
//     path: "/manager/add-good",
//     element: <Addgood/>,
//     name: "Додати товар",
//     icon: <FaAd />
//   },
//   {
//     path: "/manager/view-subcategory",
//     element: <ViewSubcategories/>,
//     name: "Перегляд підкатегорій",
//     icon: <FaWpforms />
//   },
//   {
//     path: "/manager/view-category",
//     element: <ViewCategories/>,
//     name: "Перегляд категорій",
//     icon: <FaWpforms />
//   },
//   {
//     path: "/manager/view-one-good",
//     element: <Viewonegood/>,
//     name: "Перегляд товару",
//     icon: <FaWpforms />
//   },
//   {
//     path: "/manager/add-photo",
//     element: <Addphotosgood/>,
//     name: "Додати зображення товару",
//     icon: <FaAd />
//   },
//   {
//     path: "/manager/add-property",
//     element: <AddProperties/>,
//     name: "Додати властивості товару",
//     icon: <FaAd />
//   },
//   {
//     path: "/manager/add-property-by-category",
//     element: <AddPropertiesByCategory/>,
//     name: "Перелік властивостей для підкатегорій",
//     icon: <FaAd />
//   },
//   {
//     path: "/manager/add-category",
//     element: <AddCategories/>,
//     name: "Додати категорію товару",
//     icon: <FaAd />
//   },
//   {
//     path: "/manager/add-subcategory",
//     element: <AddSubcategories/>,
//     name: "Додати підкатегорію товару",
//     icon: <FaAd />
//   },
//   {
//     path: "/manager/add-good-to-shop",
//     element: <AddGoodToShop/>,
//     name: "Додати товар в магазин",
//     icon: <FaClipboardList />
//   },
//   {
//     path: "/manager/*",
//     element: <Notfoundpage/>
//   }
// ];

// // const managerRoutesConcat = managerRoutes.concat(routes);

// // export default managerRoutesConcat;
// export default managerRoutes;



///////////////////////////////////////////////////////////////////////////////////////////////////



import RoutesForManager from "./RoutesForManager"
import { lazy } from "react";
const Notfoundpage = lazy(() => import("../../pages/Notfoundpage"));


const SubRoutes = "/manager";

// const managerRoutes = RoutesForManager.map((route) => {
//   return {
//     ...route,
//     // Тут ви можете додати будь-які додаткові властивості до кожного об'єкта маршруту, якщо потрібно
//   };
// });

const ManagerRoutes = RoutesForManager.map((route) => ({
  path: route.path + route.subputh,
  element: route.element,
}));

const notFoundRoute = {
  path: "/manager/*",
  element: <Notfoundpage />
};

// const managerRoutesConcat = managerRoutes.concat(routes);

// export default managerRoutesConcat;
export default ManagerRoutes.concat(notFoundRoute);