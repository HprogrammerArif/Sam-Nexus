import useAuth from "../../../hooks/useAuth";
import { FaBackward, FaCoins } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { LiaFacebook, LiaPhoneSolid, LiaWhatsapp } from "react-icons/lia";
import { getCart } from "../../../utils/cartStorage";

const ShippingCart = () => {
  const { user } = useAuth();
  console.log({ user });
  const navigate = useNavigate();

  const cartsProduct = getCart();
  console.log({ cartsProduct });

  const totalPrice = cartsProduct?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const OnlineFee = 49.99;

  const handleOrder = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    const userEmail = user?.email;
    console.log(formValues);

    const orderData = {
      ...formValues,
      user: {
        phone: user?.phone,
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
      seller: {
        name: cartsProduct[0]?.seller?.name,
        email: cartsProduct[0]?.seller?.email,
        image: cartsProduct[0]?.seller?.image,
      },

      cartItems: cartsProduct,
      status: "pending",
      transactionId: null,
      date: new Date(),
      totalPrice: totalPrice + OnlineFee,
    };

    console.log({ orderData });

    try {
      const { data } = await axiosSecure.post("/order", orderData);
      console.log(data);
      toast.success(`Order Sucessfull!!`);

      //await axiosSecure.patch(`/cart/update/${userEmail}`, { status: false });

      navigate("/dashboard/myOrders");
    } catch (err) {
      console.log(err);
      toast.error("Failed to Order!");
    }
  };

  return (
    <>
      <div className="container mx-auto lg:px-16 p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 lg:gap-12">
          {/* Upload Materials Form */}
          <div className="col-span-3 border flex justify-center items-center">
            <section className="w-full overflow-y-auto  p-6 bg-white rounded-md shadow-md divide-y">
              <h2 className=" text-gray-700 mb-4  ">
                <b className="font-semibold"> Shipping Address : </b>
                <span className="text-xs">
                  (Please Fill Out Your Information)
                </span>
              </h2>

              <form onSubmit={handleOrder} className="space-y-4 scroll">
                {/* Title Field */}
                <div>
                  <label className="text-gray-700" htmlFor="name">
                    <b>Name:</b>
                  </label>
                  <input
                    name="name"
                    id="name"
                    required
                    type="text"
                    className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                  />
                </div>

                {/* phone and Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700" htmlFor="phone">
                      <b>Phone No:</b>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      placeholder="+88O160...."
                      required
                      type="number"
                      className="block w-full px-4 py-2 mt-1 text-gray-700  border border-gray-200 rounded-md focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700" htmlFor="altPhone">
                      <b>Alternative Phone No:</b>
                    </label>
                    <input
                      id="altPhone"
                      name="altPhone"
                      type="number"
                      className="block w-full px-4 py-2 mt-1 text-gray-700  border border-gray-200 rounded-md focus:outline-none"
                    />
                  </div>
                </div>

                {/* Country and Area Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700" htmlFor="zone">
                      <b> Select City:</b>
                    </label>
                    <select
                      id="city"
                      name="city"
                      required
                      className="block w-full px-4 py-2 mt-1 text-gray-700 border border-gray-200 rounded-md focus:outline-none"
                    >
                      <option value="" disabled selected>
                        Select City
                      </option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Sylhet">Sylhet</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-700" htmlFor="zone">
                      <b> Zip code *</b>
                    </label>
                    <input
                      name="zipcode"
                      id="zipcode"
                      required
                      type="text"
                      className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                    />
                  </div>
                </div>

                {/* Country and Area Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700" htmlFor="area">
                      <b>Area:</b>
                    </label>
                    <select
                      id="area"
                      name="area"
                      required
                      className="block w-full px-4 py-2 mt-1 text-gray-700 border border-gray-200 rounded-md focus:outline-none"
                    >
                      <option value="" disabled selected>
                        Select Area
                      </option>
                      <option value="Mirpur">Mirpur</option>
                      <option value="Nikunjo">Nikunjo</option>
                      <option value="Bosundora">Bosundora</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-700" htmlFor="zone">
                      <b> Email: </b>
                    </label>
                    <input
                      name="email"
                      id="email"
                      required
                      type="text"
                      className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                    />
                  </div>
                </div>

                {/* Description Field */}
                <div>
                  <label className="text-gray-700" htmlFor="description">
                    Details Location
                  </label>
                  <textarea
                    placeholder="Dhaka, Nikunjo-2, Road No - 1"
                    name="description"
                    id="description"
                    rows="2"
                    required
                    className="block w-full px-4 py-3 mt-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
                  ></textarea>
                </div>

                <section className="">
                  {/* Return and Points */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 pt-6 ">
                    <div className="px-4 py-2 bg-slate-200 flex gap-3 items-center">
                      <FaBackward />
                      <p>7 Days Happy Return</p>
                    </div>
                    <div className="px-4 py-2 bg-slate-200 flex gap-3 items-center">
                      <FaCoins />
                      <p>Purchase and Earn Point</p>
                    </div>
                  </div>

                  {/* Return and Points
                  <div className="grid grid-cols-1 py-2 border-b">
                    <div className="px-4 py-2 bg-green-100">
                      <p className="text-lg ">
                        Payment Method       <span className="text-xs">
                          (Please select a payment method)
                        </span>
                      </p>
                    </div>
                  </div> */}

                  {/* cashon delivery */}
                  <div className="grid grid-cols-1 border-b py-4">
                    <div className="mb-6 flex gap-4 items-center bg-green-100 py-2 justify-center">
                      <h3 className="">ক্যাশ অন ডেলিভারি</h3>

                      <span className="text-xs">
                        পণ্য হাতে পেয়ে টাকা পরিশোধ করুন
                      </span>
                    </div>

                    {/* <div className="px-4 py-4 w-1/2 bg-green-100 flex gap-3">
                      <input
                        name="delivery"
                        id="delivery"
                        required
                        type="radio"
                      />
                      <p>ক্যাশ অন ডেলিভারি</p>
                    </div> */}

                    {/* Mobile Wallet */}

                    {/* Return and Points */}
                    {/* <div>
                      <div className="mt-6">
                        <h3 className="">Comming Soon....</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2  ">
                        <div className="px-4 py-2 bg-slate-200 flex gap-3 items-center">
                          <p>Bikash</p>
                          <FaPaypal/>
                        </div>
                        <div className="px-4 py-2 bg-slate-200 flex gap-3 items-center">
                          <p>Nogod</p>
                          <FaPaypal/>
                        </div>
                        <div className="px-4 py-2 bg-slate-200 flex gap-3 items-center">
                          <p>Rocket</p><FaPaypal/>
                        </div>
                      </div>
                    </div> */}
                  </div>

                  {/* Checkout Summary */}
                  <div className="col-span-2 border max-h-fit md:hidden  bg-slate-50 p-3 md:p-6 rounded-md shadow-md md:gap-3">
                    <h1 className=" text-xl md:text-3xl mb-6">
                      Checkout Summary
                    </h1>

                    <div className=" space-y-3 md:space-y-8">
                      <div className="flex justify-between">
                        <h2 className="text-md">Subtotal:</h2>
                        <p className="text-md font-semibold">{totalPrice} TK</p>
                      </div>
                      <div className="flex justify-between">
                        <h2 className="text-md">Shipping Cost:</h2>
                        <p className="text-md font-semibold">{OnlineFee} TK</p>
                      </div>
                      <div className="flex justify-between">
                        <h2 className="text-md">Total:</h2>
                        <p className="text-md font-semibold">
                          {totalPrice + OnlineFee} TK
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <h2 className="text-md">Payable Total:</h2>
                        <p className="ttext-md font-semibold">
                          {totalPrice + OnlineFee} TK
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Submit Button */}
                  <div className="flex justify-center gap-2 text-s w-full border items-center bg-green-100">
                    <a
                      href="tel:01608414032"
                      className=" text-center bg-green-100  "
                    >
                      <span>
                        {" "}
                        <LiaPhoneSolid className="w-7 h-7 lg:w-10 lg:h-10 bg-green-50 rounded-full p-0.5" />
                      </span>
                    </a>

                    <a
                      href="https://wa.me/8801630299065" // Corrected WhatsApp link
                      className="relative text-gray-700 p-1 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LiaWhatsapp className="w-7 h-7 lg:w-10 lg:h-10 bg-green-50 rounded-full p-0.5" />
                    </a>

                    <a
                      href={`https://web.facebook.com/profile.php?id=61573231906192&rdid=wtjtWPXNvkscpz5Q&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F18VRPhsNjU%2F%3F_rdc%3D1%26_rdr#`}
                      className="relative text-gray-700 justify-center items-center flex p-1 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LiaFacebook className="w-7 h-7 lg:w-10 lg:h-10 bg-green-50 rounded-full p-0.5" />
                    </a>
                  </div>

                  <div className="flex justify-center w-full col-span-2  border">
                    <button
                      type="submit"
                      className="px-6 py-3 w-full text-white bg-blue-700 rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Confirm Order
                    </button>
                  </div>
                </div>
              </form>
            </section>
          </div>

          {/* Checkout Summary for large device */}
          <div className="col-span-2 border max-h-fit hidden md:block bg-slate-50 p-3 md:p-6 rounded-md shadow-md md:gap-3">
            <h1 className=" text-xl md:text-3xl mb-6">Checkout Summary</h1>

            <div className=" space-y-3 md:space-y-8">
              <div className="flex justify-between">
                <h2 className="text-xl">Subtotal:</h2>
                <p className="text-lg font-semibold">{totalPrice} TK</p>
              </div>
              <div className="flex justify-between">
                <h2 className="text-xl">Shipping Cost:</h2>
                <p className="text-lg font-semibold">{OnlineFee} TK</p>
              </div>
              <div className="flex justify-between">
                <h2 className="text-xl">Total:</h2>
                <p className="text-lg font-semibold">
                  {totalPrice + OnlineFee} TK
                </p>
              </div>
              <div className="flex justify-between">
                <h2 className="text-xl">Payable Total:</h2>
                <p className="text-lg font-semibold">
                  {totalPrice + OnlineFee} TK
                </p>
              </div>
            </div>

            {/* <div className="flex flex-col gap-4 mt-6">
              <NavLink
                to="/shipping"
                className="block py-3 bg-purple-500 text-white text-center rounded-md hover:bg-purple-600 transition-colors"
              >
                Order As A Gift
              </NavLink>
              <NavLink
                to="/shipping"
                className="block py-3 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition-colors"
              >
                Proceed To Checkout
              </NavLink>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingCart;
