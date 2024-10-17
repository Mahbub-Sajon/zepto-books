import { useState, useEffect } from "react";
import SharedBooks from "../../shared/SharedBooks/SharedBooks";
import Loading from "../../shared/Loading/Loading";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
    setLoading(false);
  }, []);

  const updateWishlist = (updatedWishlist) => {
    setWishlist(updatedWishlist);
  };

  if (loading) {
    return <Loading />;
  }

  if (wishlist.length === 0) {
    return (
      <div className="text-center font-bold text-3xl mt-5  text-red-700">
        Your wishlist is empty!
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center font-bold text-3xl mt-5 mb-2">
        This is your Wishlist
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center p-5 mx-10">
        {wishlist.map((book) => (
          <SharedBooks
            key={book.id}
            title={book.title}
            author={book.author}
            image={book.image}
            genre={book.genre}
            id={book.id}
            onToggleWishlist={updateWishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
