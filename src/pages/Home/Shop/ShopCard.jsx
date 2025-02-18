const ShopCard = ({ product }) => {
  const { image_url, title, discountPrice, productPrice } = product || {}; // Use logical OR here
  console.log(product);
  return (
    <>
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
              {title?.length <= 25
                ? title
                : title?.slice(0, 20) + "..." + title.slice(-5)}
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
    </>
  );
};

export default ShopCard;
