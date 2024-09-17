import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layouts/Root";
import { allRoutes } from "./router/allRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: allRoutes,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
