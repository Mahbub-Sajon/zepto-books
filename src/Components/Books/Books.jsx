import { useContext } from "react";
import { BooksContext } from "../../providers/BooksProvider";
import SharedBooks from "../../shared/SharedBooks/SharedBooks";

const Books = () => {
  const { books, loading, error } = useContext(BooksContext);

  //array->object->
  console.log("Let's see the books", books);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching books: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {books.map((book) => (
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
  );
};

export default Books;
