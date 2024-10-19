const Reviews = () => {
  const reviews = [
    {
      name: "Alice Johnson",
      review:
        "This book changed my perspective on life! A must-read for everyone.",
      rating: 5,
    },
    {
      name: "Mark Smith",
      review: "Engaging and thought-provoking. I couldn't put it down!",
      rating: 4,
    },
    {
      name: "Sophie Lee",
      review:
        "An insightful read that offers a lot of wisdom. Highly recommend!",
      rating: 5,
    },
  ];

  return (
    <section className="bg-gray-200 p-5 sm:p-10 mt-10">
      <h2 className="text-2xl font-bold text-center mb-5">Reader Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((review, index) => (
          <div key={index} className=" shadow-md rounded-lg p-5">
            <h3 className="text-lg font-semibold">{review.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              Rating: {review.rating} ⭐
            </p>
            <p className="text-gray-800">{review.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
