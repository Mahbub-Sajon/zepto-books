import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState, useEffect } from "react";

const SharedBooks = ({ title, author, image, genre, id, onToggleWishlist }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Checking the local storage if it's already added
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isBookInWishlist = wishlist.some((book) => book.id === id);
    setIsWishlisted(isBookInWishlist);
  }, [id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (isWishlisted) {
      const updatedWishlist = wishlist.filter((book) => book.id !== id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      onToggleWishlist(updatedWishlist);
    } else {
      const newBook = { title, author, image, genre, id };
      wishlist.push(newBook);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      onToggleWishlist(wishlist);
    }

    // Setting my list
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="w-full shadow-lg rounded-lg overflow-hidden relative hover:-translate-y-1 hover:shadow-2xl transition duration-300 ease-in-out transform  hover:scale-110 delay-150">
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt={`${title} cover`}
      />
      <div className="p-4 text-black">
        <h2 className="text-xl font-semibold ">{title}</h2>
        <p className="">Author: {author}</p>
        <p className="text-sm ">Genre: {genre}</p>
        <p className="text-sm ">ID: {id}</p>
      </div>

      <div className="mt-4">
        <div
          className={`absolute cursor-pointer bottom-3 right-3 flex transition-colors duration-300 ease-in-out ${
            isWishlisted ? "text-red-700" : "text-black"
          }`}
          onClick={toggleWishlist}
        >
          {isWishlisted ? (
            <>
              <AiFillHeart size={24} />
              <span>Added to your wishlist</span>
            </>
          ) : (
            <>
              <AiOutlineHeart size={24} />
              <span>Add to your wishlist</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedBooks;
