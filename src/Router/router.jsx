import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Wishlist from "../Pages/Wishlist/Wishlist";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ViewDetails from "../Pages/ViewDetails/ViewDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/books/:id",
        element: <ViewDetails />,
      },
    ],
  },
]);
export default router;
