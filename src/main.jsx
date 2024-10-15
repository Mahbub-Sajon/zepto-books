import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router.jsx";
import App from "./App.jsx";
import BooksProvider from "./providers/BooksProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BooksProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </BooksProvider>
  </StrictMode>
);
