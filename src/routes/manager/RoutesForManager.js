import React from "react";
import { lazy } from "react";
import { FaThList, FaAd, FaWpforms, FaClipboardList } from "react-icons/fa";
import { MdShop2, } from "react-icons/md";

const Viewgoods = lazy(() => import("../../component/good/Viewgoods"));
const Addgood = lazy(() => import("../../component/good/Addgood"));
const ViewSubcategories = lazy(() => import("../../component/subcategory/ViewSubcategoriesComponent"));
const ViewCategories = lazy(() => import("../../component/category/ViewCategoriesComponent"));
const Viewonegood = lazy(() => import("../../component/good/Viewonegood"));
const Addphotosgood = lazy(() => import("../../component/good/Addphotosgood"));
// const Notfoundpage = lazy(() => import("../pages/Notfoundpage"));
const AddProperties = lazy(() => import("../../property/AddPropertiesComponent"));
const AddPropertiesByCategory = lazy(() => import("../../property/AddPropertiesByCategoryComponent"));
const AddCategories = lazy(() => import("../../component/category/AddCategoriesComponent"));
const AddSubcategories = lazy(() => import("../../component/subcategory/AddSubcategoriesComponent"));
const AddGoodToShop = lazy(() => import("../../component/good/AddGoodToShopComponent"));
const ViewGoodsOnCounter = lazy(()=> import("../../component/good/ViewGoodsOnCounter"));



const Viewgoodsinshop = lazy(() => import("../../component/shop/ViewgoodsinshopComponent"));
const Viewonegoodinshop = lazy(() => import("../../component/shop/ViewonegoodinshopComponent"));
const AddCommentForm = lazy(() => import("../../component/comment/AddCommentForm"));
const Comments = lazy(() => import("../../component/comment/Comments"));


const RoutesForManager = [
    {
        path: "/manager/view-goods",
        element: <Viewgoods />,
        name: "Перегляд товарів",
        icon: <FaThList />,
        subputh: ""
      },
      {
        path: "/manager/add-good",
        element: <Addgood/>,
        name: "Додати товар",
        icon: <FaAd />,
        subputh: ""
      },
      {
        path: "/manager/view-subcategory",
        element: <ViewSubcategories/>,
        name: "Перегляд підкатегорій",
        icon: <FaWpforms />,
        subputh: ""
      },
      {
        path: "/manager/view-category",
        element: <ViewCategories/>,
        name: "Перегляд категорій",
        icon: <FaWpforms />,
        subputh: ""
      },
      {
        path: "/manager/view-one-good",
        element: <Viewonegood/>,
        name: "Перегляд товару",
        icon: <MdShop2 />,
        subputh: "/:id"
      },
      {
        path: "/manager/add-photo",
        element: <Addphotosgood/>,
        name: "Додати зображення товару",
        icon: <FaAd />,
        subputh: "/:id"
      },
      {
        path: "/manager/add-property",
        element: <AddProperties/>,
        name: "Додати властивості товару",
        icon: <FaAd />,
        subputh: ""
      },
      {
        path: "/manager/add-property-by-category",
        element: <AddPropertiesByCategory/>,
        name: "Перелік властивостей для підкатегорій",
        icon: <FaAd />,
        subputh: "/:id"
      },
      {
        path: "/manager/add-category",
        element: <AddCategories/>,
        name: "Додати категорію товару",
        icon: <FaAd />,
        subputh: ""
      },
      {
        path: "/manager/add-subcategory",
        element: <AddSubcategories/>,
        name: "Додати підкатегорію товару",
        icon: <FaAd />,
        subputh: ""
      },
      {
        path: "/manager/add-good-to-shop",
        element: <AddGoodToShop/>,
        name: "Додати товар в магазин",
        icon: <FaClipboardList />,
        subputh: ""
      },
      {
        path: "/manager/view-good-to-shop",
        element: <ViewGoodsOnCounter/>,
        name: "Перегляд товарів в магазині",
        icon: <FaClipboardList />,
        subputh: ""
      },
      // {
      //   path: "/manager/*",
      //   element: <Notfoundpage/>
      // }
];

export default RoutesForManager;
