import { FaMinus, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import {
  decrementCartItem,
  getCart,
  getTotalCartItems,
  incrementCartItem,
  removeFromCart,
} from "../../../utils/cartStorage";
import customImage from "../../../assets/images/placeholder.jpg";
import { LiaWhatsapp } from "react-icons/lia";

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  // Load cart on first render
  useEffect(() => {
    setCart(getCart());
  }, []);

  // Get total cart quantity
  const totalProduct = getTotalCartItems();
  const cartsProduct = getCart();
  console.log({ cartsProduct });

  const totalPrice = cartsProduct?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discountPrice = cartsProduct?.reduce(
    (total, item) => total + item.discount * item.quantity,
    0
  );

  const [processing, setProcessing] = useState(false);

  const handleRemoveFromCart = async (productId) => {
    removeFromCart(productId);
    setCart(getCart());
  };

  const handleIncrementCartItem = async (productId) => {
    // Increment quantity
    incrementCartItem(productId);
    setCart(getCart()); // re-load updated cart
  };

  const handleDecrementCartItem = async (productId) => {
    decrementCartItem(productId);
    setCart(getCart()); // re-load updated cart
  };

  if (processing) return <LoadingSpinner />;

  return (
    <div className="container mx-auto border-2 grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 lg:gap-10">
      <div className="col-span-3">
        <div className="flex flex-col col-span-3 max-w-3xl p-3 md:p-6  lg:p-10 bg-slate-50 dark:text-gray-800 divide-y dark:divide-red-500 mb-6">
          <div className="flex justify-between ">
            <h2 className="text-md ">Total: ({totalProduct} Items)</h2>
            <div className="text-right flex gap-3 items-center">
              <h2 className="text-md ">your total:</h2>

              <p className="text-md font-semibold">{totalPrice} TK</p>
              <p className="text-sm line-through text-red-600 dark:text-red-600">
                {discountPrice} Tk
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col col-span-3 max-w-3xl space-y-4  p-2 md:p-4  lg:p-10 bg-yellow-50 dark:text-gray-800 divide-y dark:divide-red-500">
          <ul className="flex flex-col divide-y dark:divide-gray-300">
            {cartsProduct?.map((item, index) => (
              <li
                key={index}
                className="flex flex-col py-6 sm:flex-row sm:justify-between "
              >
                <div className="w-full space-x-2 sm:space-x-4 flex items-center">
                  <img
                    className="flex-shrink-0 object-cover dark:border- rounded outline-none  w-12 h-12 md:w-20 md:h-20 lg:w-32 lg:h-32 dark:bg-gray-500"
                    src={item?.image ? item?.image : customImage}
                    alt="Polaroid camera"
                  />
                  <div className="flex flex-col justify-between w-full pb-4">
                    <div className="grid grid-cols-8 w-full pb-2 space-x-2">
                      <div className=" col-span-4 ml-2  space-y-2">
                        <h3 className="md:text-base text-sm leading-snug max-w-80 ">
                          {item?.name
                            ? item?.name?.slice(0, 60)
                            : "Polaroid camera Polaroid camera "}
                        </h3>

                        <div className="flex text-xs md:text-sm divide-x ml-2">
                          <button
                            onClick={() => {
                              handleRemoveFromCart(item?.productId);
                            }}
                            type="button"
                            className="flex items-center px-2 py-1 pl-0 space-x-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              className="w-4 h-4 fill-current"
                            >
                              <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                              <rect
                                width="32"
                                height="200"
                                x="168"
                                y="216"
                              ></rect>
                              <rect
                                width="32"
                                height="200"
                                x="240"
                                y="216"
                              ></rect>
                              <rect
                                width="32"
                                height="200"
                                x="312"
                                y="216"
                              ></rect>
                              <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                            </svg>
                            <span>Remove</span>
                          </button>
                          <button
                            type="button"
                            className="flex items-center px-2 py-1 space-x-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              className="w-5 h-5 fill-current"
                            >
                              <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                            </svg>
                            <span className="hidden lg:block">{`Add to favorites`}</span>
                          </button>
                        </div>
                      </div>

                      {/* Increase and decrease quantity!! */}
                      <div className="col-span-2 flex items-center text-xs  lg:text-sm ">
                        <button
                          onClick={() =>
                            handleDecrementCartItem(item?.productId)
                          }
                          className="text-gray-600"
                        >
                          <FaMinus />
                        </button>

                        <input
                          type="text"
                          className="md:mx-2 w-7 lg:w-12 text-center border border-gray-300 rounded"
                          value={item.quantity}
                          readOnly
                        />

                        <button
                          onClick={() =>
                            handleIncrementCartItem(item?.productId)
                          }
                          className="text-gray-600"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <div className="text-right flex items-center col-span-2">
                        <p className=" text-xs  md:text-sm lg:text-base font-semibold">
                          {item?.price ? item?.price : 0}{" "}
                          <span className="text-xs">Tk</span>
                        </p>
                        {/* <p className=" text-[8px] md:text-xs lg:text-sm line-through dark:text-gray-400">
                          {item?.discount ? item?.discount : 0} TK
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-slate-50 col-span-2 border">
        <div className="flex flex-col  p-6  md:p-8 bg-slate-50 dark:text-gray-800 divide-y dark:divide-red-500 mb-6">
          <h1 className=" text-2xl lg:text-3xl mb-6">Checkout Summary</h1>
          <div className="flex justify-between md:py-4">
            <h2 className="text-xl ">Subtotal:</h2>
            <p className="text-lg font-semibold">{totalPrice} TK</p>
          </div>
          {/* <div className="flex justify-between py-3">
            <h2 className="text-xl ">Online Fee:</h2>
            <p className="text-lg font-semibold">{} TK.</p>
          </div> */}
          <div className="flex justify-between py-3">
            <h2 className="text-xl ">Total:</h2>
            <p className="text-lg font-semibold">{totalPrice} TK</p>
          </div>
          <div className="flex justify-between py-3">
            <h2 className="text-xl ">Payable Total: </h2>
            <p className="text-lg font-semibold">{totalPrice} TK</p>
          </div>
          <br /> <br />
          <div className="flex flex-col text-center gap-4">
            <a
              href="https://wa.me/8801630299065" // Corrected WhatsApp link
              className="relative text-slate-50 p-1 bg-red-900 flex gap-6 justify-center items-center py-3  text-base  "
              target="_blank"
              rel="noopener noreferrer"
            >
              Order On Whatsapp{" "}
              <LiaWhatsapp className="w-7 h-7 lg:w-10 lg:h-10 text-gray-700 bg-green-50 rounded-full p-0.5" />
            </a>

            <NavLink
              to={"/shipping"}
              className="bg-purple-500 py-3 text-slate-50 text-base"
            >
              Order As A Gifts
            </NavLink>
            <NavLink
              to={"/shipping"}
              className="bg-blue-500  py-3  text-slate-50 text-base"
            >
              Proceed To Checkout
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
