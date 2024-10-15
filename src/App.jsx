import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Books from "./Components/Books/Books";

function App() {
  return (
    <div>
      <Navbar />
      <Books />
      <Outlet />
    </div>
  );
}

export default App;
