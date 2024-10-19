import quote from "../../assets/quote.png";

const Quotes = () => {
  return (
    <section className="bg-gray-200 px-5 sm:px-10 lg:px-20 py-10">
      <h1 className="text-center text-3xl font-bold my-5">
        Welcome to Zepto Books
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-1/2 mb-5 md:mb-0">
          <p className="text-xl font-serif font-semibold mr-4">
            When I look back, I am so impressed again with the life-giving power
            of literature. If I were a young person today, trying to gain a
            sense of myself in the world, I would do that again by reading, just
            as I did when I was young.
            <br />– Maya Angelou
          </p>
          <button className="mt-4 bg-gray-400 px-4 py-2 rounded hover:bg-gray-300">
            Get Started
          </button>
        </div>
        <img
          className="w-full md:w-1/2 rounded-md object-cover"
          src={quote}
          alt="Quote Illustration"
        />
      </div>
    </section>
  );
};

export default Quotes;
