import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SharedBooks = ({ title, author, image, genre, id, onToggleWishlist }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

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

    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="flex flex-col h-full w-full shadow-lg rounded-lg overflow-hidden relative hover:-translate-y-1 hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 delay-150">
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt={`${title} cover`}
      />
      <div className="flex-grow p-4 text-black">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p>
          <span className="font-bold">Author:</span> {author}
        </p>
        <p className="text-sm">
          <span className="font-bold">Genre:</span> {genre}
        </p>
        <p className="text-sm">
          <span className="font-bold">Book ID:</span> {id}
        </p>
      </div>

      <div className="p-4 pb-5">
        <div
          className={`flex justify-center transition-colors duration-300 ease-in-out mb-2 ${
            isWishlisted ? "text-pink-600" : "text-black"
          } cursor-pointer`}
          onClick={toggleWishlist}
        >
          {isWishlisted ? (
            <>
              <AiFillHeart size={24} />
              <span className="ml-2">Added to your wishlist</span>
            </>
          ) : (
            <>
              <AiOutlineHeart size={24} />
              <span className="ml-2">Add to your wishlist</span>
            </>
          )}
        </div>

        <button className="bg-gray-400 w-full px-3 py-2 rounded text-center">
          <Link to={`/books/${id}`}>View Details</Link>
        </button>
      </div>
    </div>
  );
};

export default SharedBooks;
