import { BsList } from "react-icons/bs";
import logo from "../../assets/Zepto.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //Function for toggle menu icon for mobile
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky bg-white top-0 p-3 z-10 shadow-md">
      <nav className="mx-auto px-5 max-w-[1220px] flex justify-between items-center">
        <div className="flex justify-center align-middle items-center">
          <NavLink to="/">
            <img
              className="hidden md:block w-[3rem] rounded-md"
              src={logo}
              alt=""
            />
          </NavLink>
          <h2 className="font-bold text-xl ml-5 hidden md:block">
            <span className="text-[#0271bb]">Zepto</span>{" "}
            <span className="text-[#f6921f]">Books</span>
          </h2>
        </div>
        {/* Hamburger icon for mobile menu */}
        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          <BsList size={24} />
        </div>
        <ul
          className={`flex-col md:flex md:flex-row md:space-x-5 absolute md:relative bg-[#dadada] md:bg-transparent w-full md:w-auto left-0 top-full transition-all duration-500 ease-in-out ${
            isMenuOpen ? "flex" : "hidden"
          } md:flex md:items-center`}
          onClick={closeMenu}
        >
          <NavLink
            to="/"
            className="py-2 px-4 hover:bg-gray-300 rounded-md duration-500 "
          >
            Home
          </NavLink>
          <NavLink
            to="/wishlist"
            className="py-2 px-4 hover:bg-gray-300 rounded-md duration-500"
          >
            My Wishlist
          </NavLink>

          <NavLink
            to="/about"
            className="py-2 px-4 hover:bg-gray-300 rounded-md duration-500"
          >
            About Us
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
