import { useContext, useState, useEffect } from "react";
import { BooksContext } from "../../providers/BooksProvider";
import SharedBooks from "../../shared/SharedBooks/SharedBooks";
import Loading from "../../shared/Loading/Loading";

const Books = () => {
  const { books, loading, error } = useContext(BooksContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const booksPerPage = 6;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  const genres = [
    ...new Set(books.map((book) => book.subjects[0] || "Unknown Genre")),
  ];

  //for search bar
  const filteredBooks = books.filter((book) => {
    const titleMatches = book.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // for genre
    const genreMatches =
      selectedGenre === "" || book.subjects[0] === selectedGenre;

    // returning both
    return titleMatches && genreMatches;
  });

  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  //wishlist
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const updateWishlist = (updatedWishlist) => {
    setWishlist(updatedWishlist);
  };

  //for pagination logic
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="text-center text-red-700 font-semibold">
        Failed to load books. Please refresh the page or try again later. (
        {error.message})
      </div>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-5 mx-2">
        Search your desired books
      </h1>
      <div className="p-4 flex justify-center items-center space-x-4 mb-8">
        {/* search bar  */}
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-slate-700 px-3 py-2 rounded-md w-full md:w-1/3"
        />

        {/* dropdown selector */}
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border border-slate-700 px-3 py-2 rounded-md w-full md:w-1/3"
        >
          <option value="">All Genres</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <h1 className="text-3xl font-bold text-center">See the collections</h1>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center p-5 mx-10">
          {currentBooks.length > 0 ? (
            currentBooks.map((book) => (
              <SharedBooks
                key={book.id}
                title={book.title}
                author={book.authors[0]?.name}
                image={book.formats["image/jpeg"]}
                genre={book.subjects || "Unknown Genre"}
                id={book.id}
                onToggleWishlist={updateWishlist}
              />
            ))
          ) : (
            <div className="col-span-full text-2xl font-bold text-red-700">
              Sorry, the book you are looking for is not available.
            </div>
          )}
        </div>
      </div>

      {/* ui for pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-md bg-gray-200 text-gray-700"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-md bg-gray-200 text-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Books;
