import Products from "../pages/Products";
import Orders from "../pages/Orders";

import Customers from "../pages/Customers";
import Categories from "../pages/Categories";
import EditProduct from "../components/products/EditProduct";
import ViewProduct from "../components/products/ViewProduct";
import Addproducts from "../components/products/Addproducts";
import AddProductsSubMenu from "../pages/AddProductsSubMenu";

export const allRoutes = [
  { path: "products", element: <Products /> },
  { path: "products/add", element: <AddProductsSubMenu /> },
  { path: "products/edit/:id", element: <EditProduct /> },
  { path: "products/:id", element: <ViewProduct /> },
  { path: "orders", element: <Orders /> },
  { path: "customers", element: <Customers /> },
  { path: "categories", element: <Categories /> },
];
