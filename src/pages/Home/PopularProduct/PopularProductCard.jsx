import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const PopularProductCard = ({ product, handleSubmit}) => {
  const { image_url, title, discountPrice, productPrice, _id } = product;
  console.log(product);
  return (
    <>
      <div className="max-w-xs rounded-md max-h-96 shadow-md  dark:bg-gray-50 dark:text-gray-800 flex items-center justify-center flex-col">
        <NavLink to={`/products/${_id}`}>
          <div className="border h-28 md:h-64 w-full object-cover  overflow-hidden p-2">
            <img
              src={image_url}
              alt=""
              className="w-full h-full object-cover object-center rounded-t-md dark:bg-gray-500 scale-95 hover:scale-100"
            />
          </div>

          <div className="flex flex-col justify-center items-center md:p-2 md:space-y-3 w-full">
            <div className="">
              <h2 className=" text-sm md:text-lg font-semibold tracking-wide">
                {title.length <= 25
                  ? title
                  : title.slice(0, 20) + "..." + title.slice(-5)}
              </h2>
              {
                <>
                  <span className="text-gray-500 line-through text-xs">
                    {discountPrice | 100} ৳
                  </span>
                  <span className="text-red-500 font-semibold ml-2 text-sm md:text-base">
                    {productPrice} ৳
                  </span>
                </>
              }
            </div>
          </div>
        </NavLink>
        <button
        onClick={(event) => handleSubmit(event, _id)} type="button"
          className="flex items-center justify-center w-full md:w-[60%]  py-1.5 px-2 font-semibold tracking-wide rounded-md bg-slate-200 hover:bg-green-600  hover:text-gray-50 text-sm md:text-base "
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};



PopularProductCard.propTypes = {
  product: PropTypes.object,
  handleSubmit: PropTypes.func
};

export default PopularProductCard;

{
  /* <button>
            {new Date(product?.registrationEndTime) > new Date()
              ? "Ongoing"
              : "Closed"}
          </button> */
}
