import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PopularProductCard = ({ product  }) => {
  console.log(product);
  return (
    <div
      //to={`/job/${product._id}`}
      className="w-full max-w-md px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all"
    >
      <div className="flex mt-1 items-center justify-between">
        <span className="px-3 py-1 text-sm text-blue-800 uppercase bg-blue-200 rounded-full ">
          <button>
            {new Date(product?.registration_end_date) > new Date()
              ? "Ongoing"
              : "Closed"}
          </button>
        </span>
        
      </div>

      <div className="flex justify-around flex-col">
        <h1 className="mt-2 text-lg font-semibold text-gray-800 ">
          {product?.title>30? product?.title.substring(0, 50): product?.title}...
        </h1>

        <p title={product?.description} className="mt-2 text-sm text-gray-600 ">
          {product?.description.substring(0, 180)}.........
        </p>
        
        <div className="mt-2 text-sm text-gray-600 ">
            <Link to={`/session/${product?._id}`}>
            <button className="px-2 py-1 text-white bg-gradient-to-r from-green-900 to-red-800">
              Read More
            </button>
            </Link>
            </div>
        
      </div>
    </div>
  );
};

PopularProductCard.propTypes = {
  product: PropTypes.object,
};

export default PopularProductCard;

{
  /* <button>
            {new Date(product?.registrationEndTime) > new Date()
              ? "Ongoing"
              : "Closed"}
          </button> */
}
