import { useState, useEffect } from "react";
import SharedBooks from "../../shared/SharedBooks/SharedBooks";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const updateWishlist = (updatedWishlist) => {
    setWishlist(updatedWishlist);
  };

  if (wishlist.length === 0) {
    return <div>Your wishlist is empty!</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center p-5 mx-10">
      {wishlist.map((book) => (
        <div key={book.id} className="relative">
          <SharedBooks
            title={book.title}
            author={book.author}
            image={book.image}
            genre={book.genre}
            id={book.id}
            onToggleWishlist={updateWishlist}
          />
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
