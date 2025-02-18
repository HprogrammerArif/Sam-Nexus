import PropTypes from "prop-types";

const PopularProductCard = ({ product }) => {
  const { image_url, title, discountPrice, productPrice } = product;
  console.log(product);
  return (
    <div className="max-w-xs rounded-md h-96 shadow-md  dark:bg-gray-50 dark:text-gray-800 flex items-center justify-center flex-col">
      <div className="border h-48 md:h-64 w-full object-cover  overflow-hidden p-2">
        <img
          src={image_url}
          alt=""
          className="w-full h-full object-cover object-center rounded-t-md dark:bg-gray-500 scale-95 hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-center items-center p-2 space-y-3 w-full">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold tracking-wide">
            {title.length <= 25
              ? title
              : title.slice(0, 20) + "..." + title.slice(-5)}
          </h2>
          {
            <>
              <span className="text-gray-500 line-through text-xs">
                {discountPrice | 100} ৳
              </span>
              <span className="text-red-500 font-semibold ml-2">
                {productPrice} ৳
              </span>
            </>
          }
        </div>
        <button
          type="button"
          className="flex items-center justify-center w-[60%]  py-1.5 font-semibold tracking-wide rounded-md bg-slate-200 hover:bg-green-600 hover:text-gray-50"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// <div
//   //to={`/job/${product._id}`}
//   className="w-full max-w-md px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all"
// >
//   <div className="flex mt-1 items-center justify-between">
//     <span className="px-3 py-1 text-sm text-blue-800 uppercase bg-blue-200 rounded-full ">
//       <button>
//         {new Date(product?.registration_end_date) > new Date()
//           ? "Ongoing"
//           : "Closed"}
//       </button>
//     </span>
//   </div>

//   <div className="flex justify-around flex-col">
//     <h1 className="mt-2 text-lg font-semibold text-gray-800 ">
//       {product?.title > 30
//         ? product?.title.substring(0, 50)
//         : product?.title}
//       ...
//     </h1>

//     <p title={product?.description} className="mt-2 text-sm text-gray-600 ">
//       {product?.description.substring(0, 180)}.........
//     </p>

//     <div className="mt-2 text-sm text-gray-600 ">
//       <Link to={`/session/${product?._id}`}>
//         <button className="px-2 py-1 text-white bg-gradient-to-r from-green-900 to-red-800">
//           Read More
//         </button>
//       </Link>
//     </div>
//   </div>

// </div>

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
