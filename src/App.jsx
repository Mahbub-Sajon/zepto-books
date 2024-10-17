import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./shared/Footer/Footer";

function App() {
  return (
    <div className="bg-[#d9e1d5]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
