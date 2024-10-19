import { useState, useEffect } from "react";

const useWishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    // Initialize state from localStorage
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  const updateLocalStorage = (newWishlist) => {
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  const addToWishlist = (book) => {
    setWishlist((prevWishlist) => {
      // Check if the book is already in the wishlist
      if (prevWishlist.some((item) => item.id === book.id)) {
        return prevWishlist; // Don't add duplicates
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
