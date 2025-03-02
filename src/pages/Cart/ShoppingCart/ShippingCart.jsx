import useAuth from "../../../hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ShippingCart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, refetch, isLoading] = useCart();

  const handleOrder = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formValues);

    const orderData = {
      ...formValues,
      user: {
        phone: user?.phone,
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
      cartItems: cart,
      status: "pending",
      transactionId: null,
      date: new Date(),
      totalPrice:
        cart?.reduce(
          (total, item) => total + item.productPrice * item.quantity,
          0
        ) + 20,
    };

    try {
      const { data } = await axiosSecure.post("/order", orderData);
      console.log(data);
      toast.success(`Order Sucessfull!!`);
      refetch();

      navigate("/dashboard/myBooking");
    } catch (err) {
      console.log(err);
      toast.error("Failed to Order!");
    }
    
  };

  const totalPrice = cart?.reduce(
    (total, item) => total + item.productPrice * item.quantity,
    0
  );
  const OnlineFee = 20;

  return (
    <>
      <div className="container mx-auto md:px-16 p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Upload Materials Form */}
          <div className="col-span-3 border flex justify-center items-center">
            <section className="w-full overflow-y-auto  p-6 bg-white rounded-md shadow-md divide-y">
              <h2 className=" text-gray-700 mb-4  ">
                Shipping Address{" "}
                <span className="text-xs">
                  (Please Fill Out Your Information)
                </span>
              </h2>

              <div className="flex gap-3">
                <p className="mr-3">
                  <b>Pick up your parcel from: </b>
                </p>
                <div className="flex justify-center items-center gap-2">
                  <label className="text-gray-700" htmlFor="title">
                    Home
                  </label>
                  <input name="pickupLocation" id="home" required type="radio" />
                </div>
                <div className="flex justify-center items-center gap-2">
                  <label className="text-gray-700" htmlFor="office">
                    Office
                  </label>
                  <input name="pickupLocation" id="office" required type="radio" />
                </div>
              </div>

              <br />

              <form onSubmit={handleOrder} className="space-y-4 scroll">
                {/* Title Field */}
                <div>
                  <label className="text-gray-700" htmlFor="name">
                    Name
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
                      Phone No:
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
                      Alternative Phone No:
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
                    <label className="text-gray-700" htmlFor="country">
                      Country:
                    </label>

                    <select
                      id="country"
                      name="country"
                      required
                      defaultValue="Bangladesh" // Use defaultValue here instead of selected on <option>
                      className="block w-full px-4 py-2 mt-1 text-gray-700 border border-gray-200 rounded-md focus:outline-none"
                    >
                      <option value="" disabled>
                        Select Country
                      </option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-700" htmlFor="zone">
                      Select City:
                    </label>
                    <select
                      id="city"
                      name="city"
                      required
                      defaultValue=""
                      className="block w-full px-4 py-2 mt-1 text-gray-700 border border-gray-200 rounded-md focus:outline-none"
                    >
                      <option value="" disabled>
                        Select City
                      </option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Sylhet">Sylhet</option>
                    </select>
                  </div>
                </div>

                {/* Country and Area Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700" htmlFor="area">
                      Area:
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
                      Select Zone:
                    </label>
                    <select
                      id="zone"
                      name="zone"
                      required
                      className="block w-full px-4 py-2 mt-1 text-gray-700 border border-gray-200 rounded-md focus:outline-none"
                    >
                      <option value="" disabled selected>
                        Select Zone
                      </option>
                      <option value="block-2">block-2</option>
                      <option value="road-3">road-3</option>
                      <option value="road-5">road-5</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                </div>

                {/* Description Field */}
                <div>
                  <label className="text-gray-700" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    placeholder="Write in details"
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
                    <div className="px-4 py-2 bg-slate-200">
                      <p>7 Days Happy Return</p>
                    </div>
                    <div className="px-4 py-2 bg-slate-200">
                      <p>Purchase and Earn Point</p>
                    </div>
                  </div>

                  {/* Return and Points */}
                  <div className="grid grid-cols-1 py-2 border-b">
                    <div className="px-4 py-2 bg-slate-100">
                      <p>
                        Payment Method
                        <span className="text-xs">
                          (Please select a payment method)
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* cashon delivery */}
                  <div className="grid grid-cols-1 border-b py-6">
                    <div className="mb-6">
                      <h3 className="mb-2">ক্যাশ অন ডেলিভারি</h3>

                      <span className="text-xs">
                        পণ্য হাতে পেয়ে টাকা পরিশোধ করুন
                      </span>
                    </div>

                    <div className="px-4 py-3 bg-slate-100 flex gap-3">
                      <input
                        name="delivery"
                        id="delivery"
                        required
                        type="radio"
                      />
                      <p>ক্যাশ অন ডেলিভারি</p>
                    </div>

                    {/* Mobile Wallet */}

                    {/* Return and Points */}
                    <div>
                      <div className="mt-6">
                        <h3 className="">Comming Soon....</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2  ">
                        <div className="px-4 py-2 bg-slate-200">
                          <p>Bikash</p>
                        </div>
                        <div className="px-4 py-2 bg-slate-200">
                          <p>Nogod</p>
                        </div>
                        <div className="px-4 py-2 bg-slate-200">
                          <p>Rocket</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Submit Button */}
                <div className="flex justify-center w-full border">
                  <button
                    type="submit"
                    className="px-6 py-2 w-full text-white bg-blue-700 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Confirm Order
                  </button>
                </div>
              </form>
            </section>
          </div>

          {/* Checkout Summary */}
          <div className="col-span-2 border max-h-fit  bg-slate-50 md:p-6 rounded-md shadow-md gap-3">
            <h1 className="text-3xl mb-6">Checkout Summary</h1>

            <div className="space-y-8">
              <div className="flex justify-between">
                <h2 className="text-xl">Subtotal:</h2>
                <p className="text-lg font-semibold">{totalPrice} TK</p>
              </div>
              <div className="flex justify-between">
                <h2 className="text-xl">Online Fee:</h2>
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
