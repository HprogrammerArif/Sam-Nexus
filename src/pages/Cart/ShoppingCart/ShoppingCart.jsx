import { FaMinus, FaPlus } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useCart from "../../../hooks/useCart";

const ShoppingCart = () => {
  const [quantity, setQuantity] = useState(1);

  const [cart, refetch, isLoading] = useCart();

  const { id } = useParams();
  console.log(id);
  const axiosSecure = useAxiosSecure();
  const [processing, setProcessing] = useState(false);
  //payment and booking releted
  const [role] = useRole();
  const { user } = useAuth();
  console.log(role);

  const handleDeleteItem = async (itemId) => {
    console.log(itemId);
    try {
      const { data } = await axiosSecure.delete(`/carts/${itemId}`);
      console.log(data);
      toast.success("Product Deleted Sucessfully!!");
      refetch();
    } catch (error) {
      toast.error("Something Went Wrong!!");
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      if (newQuantity < 1) return;
      await axiosSecure.patch(`/carts/${itemId}`, { quantity: newQuantity });
      refetch(); // Refresh cart data
    } catch (error) {
      toast.error("Failed to update quantity!");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (role === "seller" || role === "admin") {
      return toast.error(`Action Not Allowed!! You are a ${role}`);
    }
    setProcessing(true);

    //1. create payment info obj
    const paymentInfo = {
      ...bookingInfo,
      productId: bookingInfo._id,
      transactionId: null,
      date: new Date(),
    };
    delete paymentInfo._id;
    console.log(paymentInfo);

    try {
      //2. save payment info in booking collection(db)
      const { data } = await axiosSecure.post("/booking", paymentInfo);
      console.log(data);

      // //3. changed room status to booked in db
      // const { data: updateStatus } = await axiosSecure.patch(
      //   `/session/status/${bookingInfo?._id}`,
      //   { status: true }
      // );
      // console.log(updateStatus);

      //update ui
      refetch();

      //navigate("/dashboard/myBooking");
    } catch (err) {
      console.log(err);
    }
    setProcessing(false);
  };

  const totalPrice = cart?.reduce(
    (total, item) => total + item.productPrice * item.quantity,
    0
  );
  const OnlineFee = 20;

  const discountPrice = cart?.reduce(
    (total, item) => total + item.discount * item.quantity,
    0
  );

  if (isLoading || processing) return <LoadingSpinner />;

  return (
    <div className="container mx-auto border-2 grid grid-cols-1 md:grid-cols-5 gap-10">
      <div className="col-span-3">
        <div className="flex flex-col col-span-3 max-w-3xl p-6  sm:p-10 bg-slate-50 dark:text-gray-800 divide-y dark:divide-red-500 mb-6">
          <div className="flex justify-between ">
            <h2 className="text-xl ">Total: ({cart?.length} Items)</h2>
            <div className="text-right flex gap-3 items-center">
              <h2 className="text-xl ">your total:</h2>

              <p className="text-lg font-semibold">{totalPrice} TK</p>
              <p className="text-sm line-through text-red-600 dark:text-red-600">
                {discountPrice} Tk
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col col-span-3 max-w-3xl p-6 space-y-4 sm:p-10 bg-yellow-50 dark:text-gray-800 divide-y dark:divide-red-500">
          <ul className="flex flex-col divide-y dark:divide-gray-300">
            {cart?.map((item, index) => (
              <li
                key={index}
                className="flex flex-col py-6 sm:flex-row sm:justify-between "
              >
                <div className="flex w-full space-x-2 sm:space-x-4">
                  <img
                    className="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                    src={item?.image_url}
                    alt="Polaroid camera"
                  />
                  <div className="flex flex-col justify-between w-full pb-4">
                    <div className="grid grid-cols-6 w-full pb-2 space-x-2">
                      <div className="space-y-1 col-span-4 ml-2">
                        <h3 className="text-base leading-snug max-w-80 ">
                          {item?.title.slice(0, 80)}
                        </h3>
                        <div className="flex justify-around max-w-80">
                          <p className="text-sm dark:text-gray-600">
                            Brand:{" "}
                            <span className="font-semibold text-blue-500">
                              {item?.brandName}
                            </span>
                          </p>
                          <p className="text-sm dark:text-gray-600">
                            Category:{" "}
                            <span className="font-semibold text-blue-500">
                              {item?.category}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Increase and decrease quantity!! */}
                      <div className="col-span-1 flex items-center text-sm space-x-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item?.productId,
                              item.quantity - 1
                            )
                          }
                          className="text-gray-600"
                        >
                          <FaMinus />
                        </button>

                        <input
                          type="text"
                          className="mx-2 w-12 text-center border border-gray-300 rounded"
                          value={item.quantity}
                          readOnly
                        />

                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item?.productId,
                              item.quantity + 1
                            )
                          }
                          className="text-gray-600"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <div className="text-right col-span-1">
                        <p className="text-base font-semibold">
                          {item?.productPrice} TK
                        </p>
                        <p className="text-sm line-through dark:text-gray-400">
                          {item?.discount ? item?.discount : 0} TK
                        </p>
                      </div>
                    </div>

                    <div className="flex text-sm divide-x ml-2">
                      <button
                        onClick={() => {
                          handleDeleteItem(item?._id);
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
                          <rect width="32" height="200" x="168" y="216"></rect>
                          <rect width="32" height="200" x="240" y="216"></rect>
                          <rect width="32" height="200" x="312" y="216"></rect>
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
                          className="w-4 h-4 fill-current"
                        >
                          <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                        </svg>
                        <span>Add to favorites</span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-slate-50 col-span-2 border">
        <div className="flex flex-col  p-6  sm:p-10 bg-slate-50 dark:text-gray-800 divide-y dark:divide-red-500 mb-6">
          <h1 className="text-3xl mb-6">Checkout Summary</h1>
          <div className="flex justify-between py-4">
            <h2 className="text-xl ">Subtotal:</h2>
            <p className="text-lg font-semibold">{totalPrice} TK</p>
          </div>
          <div className="flex justify-between py-3">
            <h2 className="text-xl ">Online Fee:</h2>
            <p className="text-lg font-semibold">{OnlineFee} TK.</p>
          </div>
          <div className="flex justify-between py-3">
            <h2 className="text-xl ">Total:</h2>
            <p className="text-lg font-semibold">{totalPrice + OnlineFee} TK</p>
          </div>
          <div className="flex justify-between py-3">
            <h2 className="text-xl ">Payable Total: </h2>
            <p className="text-lg font-semibold">{totalPrice + OnlineFee} TK</p>
          </div>
          <br /> <br />
          <div className="flex flex-col text-center gap-4">
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
