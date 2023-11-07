import RoutesForAdmin from "./RoutesForAdmin"
import { lazy } from "react";
const Notfoundpage = lazy(() => import("../../pages/Notfoundpage"));


const AdminRoutes = RoutesForAdmin.map((route) => ({
  path: route.path + route.subputh,
  element: route.element,
}));

const notFoundRoute = {
  path: "/*",
  element: <Notfoundpage />
};

// const managerRoutesConcat = managerRoutes.concat(routes);

// export default managerRoutesConcat;
export default AdminRoutes.concat(notFoundRoute);