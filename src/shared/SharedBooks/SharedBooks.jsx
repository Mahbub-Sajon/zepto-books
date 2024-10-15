import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState, useEffect } from "react";

const SharedBooks = ({ title, author, image, genre, id }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // checking the local storage if it's already added
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
    } else {
      // adding to my list
      const newBook = { title, author, image, genre, id };
      wishlist.push(newBook);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    // aetting my list
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out relative">
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt={`${title} cover`}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600">by {author}</p>
        <p className="text-sm text-gray-500">Genre: {genre}</p>
        <p className="text-sm text-gray-500">ID: {id}</p>
      </div>

      <div
        className={`absolute cursor-pointer bottom-3 right-3 flex transition-colors duration-300 ease-in-out ${
          isWishlisted ? "text-red-500" : "text-gray-400"
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
  );
};

export default SharedBooks;
