import { useContext, useState } from "react";
import { BooksContext } from "../../providers/BooksProvider";
import SharedBooks from "../../shared/SharedBooks/SharedBooks";
import Loading from "../../shared/Loading/Loading";

const Books = () => {
  const { books, loading, error } = useContext(BooksContext);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  // pagination handling from here
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // buttons for pagination
  const renderPaginationButtons = () => {
    let buttons = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`px-3 py-1 border rounded-md ${
              currentPage === i
                ? "bg-blue-500 text-white"
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
              ? "bg-blue-500 text-white"
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
                ? "bg-blue-500 text-white"
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
              ? "bg-blue-500 text-white"
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

  if (loading) return <Loading></Loading>;
  if (error) return <div>Error fetching books: {error.message}</div>;

  return (
    <div>
      {/* My Books Dta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {currentBooks.map((book) => (
          <SharedBooks
            key={book.id}
            title={book.title}
            author={book.authors[0]?.name}
            image={book.formats["image/jpeg"]}
            genre={book.subjects[0] || "Unknown Genre"}
            id={book.id}
          />
        ))}
      </div>

      <div className="flex justify-center items-center mt-4 space-x-2">
        {renderPaginationButtons()}

        {/* the side dropdown */}
        <div className="ml-4">
          <label htmlFor="page-selector" className="mr-2 text-gray-700">
            Go to page:
          </label>
          <select
            id="page-selector"
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            className="border px-2 py-1 rounded-md"
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
