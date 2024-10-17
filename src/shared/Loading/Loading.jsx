import { IoBookSharp } from "react-icons/io5";

const Loading = () => {
  return (
    <div className="flex justify-center my-auto mt-10 animate-bounce">
      <div>
        {" "}
        <IoBookSharp className="text-5xl" />
        <p className="font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
