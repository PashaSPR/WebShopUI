import React from "react";
import { lazy } from "react";
import { FaThList, FaAd, FaWpforms, FaClipboardList } from "react-icons/fa";
import { MdShop2, } from "react-icons/md";

const Viewgoodsinshop = lazy(() => import("../../component/shop/ViewgoodsinshopComponent"));
const Viewonegoodinshop = lazy(() => import("../../component/shop/ViewonegoodinshopComponent"));
const AddCommentForm = lazy(() => import("../../component/comment/AddCommentForm"));
const Comments = lazy(() => import("../../component/comment/Comments"));


const RoutesForCustomer = [
    {
        path: "/shop",
        element: <Viewgoodsinshop />,
        name: "Магазин",
        icon: <MdShop2 />,
        subputh: ""
      },
      {
        path: "/good",
        element: <Viewonegoodinshop/>,
        name: "Перегляд товару",
        icon: <FaThList />,
        subputh: "/:id"
      },
      {
        path: "/add-comment",
        element: <AddCommentForm/>,
        name: "Додати коментар",
        icon: <FaAd />,
        subputh: "/:id"
      },
      {
        path: "/comments",
        element: <Comments/>,
        name: "Коментарі",
        icon: <FaWpforms />,
        subputh: ""
      },
      {
        path: "/cart",
        element: <Comments/>,
        name: "Корзина",
        icon: <FaWpforms />,
        subputh: ""
      },
      {
        path: "/cabinet",
        element: <Comments/>,
        name: "Кабінет",
        icon: <FaWpforms />,
        subputh: ""
      }
];

export default RoutesForCustomer;
