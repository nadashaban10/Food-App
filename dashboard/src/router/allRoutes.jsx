import Products from "../pages/Products";
import Orders from "../pages/Orders";

import Customers from "../pages/Customers";
import Categories from "../pages/Categories";

export const allRoutes = [
  { path: "/products", element: <Products /> },
  { path: "/orders", element: <Orders /> },
  { path: "/customers", element: <Customers /> },
  { path: "/categories", element: <Categories /> },
];
