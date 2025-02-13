import { Link } from "react-router-dom";

const Slide = ({ image, text, des }) => {
  return (
    <div
      className="w-full bg-center object-cover bg-cover h-[38rem]"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-900/70">
        <div className="text-center">
          <h1 className="text-3xl mb-2 font-semibold text-white lg:text-4xl">
            {text}
          </h1>
          <p className=" text-white max-w-[800px] mb-3">{des}</p>
          <br />
          <Link
            //to="/all-foods"
            className="w-full px-5 py-4 mt-4 text-md font-medium text-white capitalize bg-gradient-to-r from-red-900 to-violet-900 rounded-md lg:w-auto border border-green-800"
          >
            Discover More Optunity
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;
