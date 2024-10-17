import { useContext, useState, useEffect } from "react";
import { BooksContext } from "../../providers/BooksProvider";
import SharedBooks from "../../shared/SharedBooks/SharedBooks";
import Loading from "../../shared/Loading/Loading";

const Books = () => {
  const { books, loading, error } = useContext(BooksContext);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  const genres = [
    ...new Set(books.map((book) => book.subjects[0] || "Unknown Genre")),
  ];

  //filtering genre
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre
      ? book.subjects[0] === selectedGenre
      : true;
    return matchesSearch && matchesGenre;
  });

  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const updateWishlist = (updatedWishlist) => {
    setWishlist(updatedWishlist);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPaginationButtons = () => {
    let buttons = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`px-3 py-1 border rounded-md ${
              currentPage === i
                ? "bg-slate-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      buttons.push(
        <button
          key={1}
          className={`px-3 py-1 border rounded-md ${
            currentPage === 1
              ? "bg-slate-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        buttons.push(<span key="left-ellipsis">...</span>);
      }
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        buttons.push(
          <button
            key={i}
            className={`px-3 py-1 border rounded-md ${
              currentPage === i
                ? "bg-slate-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        buttons.push(<span key="right-ellipsis">...</span>);
      }

      buttons.push(
        <button
          key={totalPages}
          className={`px-3 py-1 border rounded-md ${
            currentPage === totalPages
              ? "bg-slate-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <div>
        We are trying to show you our books. Please refresh to see our
        collections. {error.message}
      </div>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-5">
        Search your desired books
      </h1>
      <div className="p-4 flex justify-center items-center space-x-4 mb-8">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-slate-700 px-3 py-2 rounded-md w-full md:w-1/3"
        />

        {/* Genre Dropdown */}
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border border-slate-700 px-3 py-2 rounded-md"
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center p-5 mx-10">
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <SharedBooks
              key={book.id}
              title={book.title}
              author={book.authors[0]?.name}
              image={book.formats["image/jpeg"]}
              genre={book.subjects[0] || "Unknown Genre"}
              id={book.id}
              onToggleWishlist={updateWishlist}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-red-500">
            Sorry, the book you are looking for is not available.
          </div>
        )}
      </div>

      <div className="flex justify-center items-center mt-4 space-x-2">
        {renderPaginationButtons()}

        <div className="ml-4">
          <label htmlFor="page-selector" className="mr-2 text-gray-700">
            Go to page:
          </label>
          <select
            id="page-selector"
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            className="border px-2 py-1 rounded-md focus:ring-1 focus:ring-slate-700 "
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Books;
