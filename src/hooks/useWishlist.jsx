import { useState, useEffect } from "react";

const useWishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  const updateLocalStorage = (newWishlist) => {
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  const addToWishlist = (book) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item.id === book.id)) {
        return prevWishlist;
      }
      const newWishlist = [...prevWishlist, book];
      updateLocalStorage(newWishlist);
      return newWishlist;
    });
  };

  const removeFromWishlist = (bookId) => {
    setWishlist((prevWishlist) => {
      const newWishlist = prevWishlist.filter((item) => item.id !== bookId);
      updateLocalStorage(newWishlist);
      return newWishlist;
    });
  };

  return { wishlist, addToWishlist, removeFromWishlist };
};

export default useWishlist;
