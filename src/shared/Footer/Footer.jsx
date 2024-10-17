const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#171727] text-white text-center py-7 mt-10 ">
      <p>
        All rights reserved © {year} Zepto Books. Crafted with ❤️ to enhance the
        web.
      </p>
    </footer>
  );
};

export default Footer;
