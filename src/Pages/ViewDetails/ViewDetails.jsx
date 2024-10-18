import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BooksContext } from "../../providers/BooksProvider";
import Loading from "../../shared/Loading/Loading";

const ViewDetails = () => {
  const { id } = useParams();
  const { books, loading, error } = useContext(BooksContext);

  const book = books.find((book) => book.id === Number(id));

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="text-center text-red-700 font-semibold">
        Failed to load book details. Please refresh the page or try again later.
        ({error.message})
      </div>
    );

  if (!book) {
    return (
      <div className="text-center text-red-700 font-semibold">
        Book not found.
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 shadow-lg rounded-lg mt-10">
      <h1 className=" mb-4 text-2xl text-center text-gray-800">
        Details about <br />{" "}
        <span className="font-bold text-3xl">{book.title}</span>
      </h1>
      <img
        className="w-full h-64 object-cover mb-6 rounded-lg shadow-md"
        src={book.formats["image/jpeg"]}
        alt={`${book.title} cover`}
      />
      <div className="text-center">
        <p className="text-xl font-semibold text-gray-700 mb-2">
          Author: {book.authors[0]?.name || "Unknown"}
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Genre: {book.subjects.join(", ") || "Unknown Genre"}
        </p>
      </div>
    </div>
  );
};

export default ViewDetails;
