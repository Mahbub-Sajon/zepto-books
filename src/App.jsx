import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./shared/Footer/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#d9e1d5]">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
