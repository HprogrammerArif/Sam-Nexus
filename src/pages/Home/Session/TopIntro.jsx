const TopIntro = ({ subHeading, heading, description }) => {
  return (
    <div>
      <div className="container px-6 py-10 mx-auto">
        <h3 className="text-center text-gray-800 font-bold capitalize  mb-4  ">
          {subHeading}
        </h3>
        <h1 className="text-2xl font-black text-center  capitalize lg:text-3xl bg-gradient-to-l from-green-600 to-violet-700 bg-clip-text text-transparent">
          {heading}
        </h1>
        <p className="max-w-3xl mx-auto my-6 text-center text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TopIntro;
