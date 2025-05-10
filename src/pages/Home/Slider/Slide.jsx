import { Link } from "react-router-dom";

const Slide = ({ image, title, description, toLink }) => {
  return (
    <div
      className="w-full bg-center object-cover  bg-cover h-[32rem]"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
        <div className="text-center">
          <h1 className="text-xl md:text-3xl mb-2 font-semibold text-white lg:text-4xl">
            {title}
          </h1>
          <p className=" text-white text-xs md:text-base max-w-[800px] mb-3">{description}</p>
          <br />
          <Link
            to={toLink}
            className="w-full px-4 py-3 lg:px-5 lg:py-4 mt-4 text-sm lg:text-md font-medium text-white capitalize bg-gradient-to-r from-red-900 to-violet-900 rounded-md lg:w-auto border border-green-800"
          >
            Discover More
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default Slide;
