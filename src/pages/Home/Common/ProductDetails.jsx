import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { QueryClient, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import BookingModal from "../../../components/Modal/BookingModal";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  // const location = useLocation();
  const [processing, setProcessing] = useState(false);
  //payment and booking releted
  const [role] = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  console.log(role);

  const handleModalOpen = () => {
    if (role === "seller" || role === "admin") {
      toast.error(`Action Not Allowed!! You are a ${role}`);
    } else {
      setIsOpen(true);
    }
  };

  const {
    data: singleProduct = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/singleProduct/${id}`);
      return data;
    },
    
      onSuccess: () => {
        QueryClient.invalidateQueries(["cart", user?.email]); // Auto-refresh cart in Navbar
      },
    
  });

  console.log(singleProduct);

  const closeModal = () => {
    setIsOpen(false);
  };

  const bookingInfo = {
    ...singleProduct,
    price: singleProduct?.productPrice,
    user: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
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
      const { data } = await axiosSecure.post("/carts", paymentInfo);
      console.log(data);

      // //3. changed room status to booked in db
      // const { data: updateStatus } = await axiosSecure.patch(
      //   `/session/status/${bookingInfo?._id}`,
      //   { status: true }
      // );
      // console.log(updateStatus);

      //update ui
      refetch();
      toast.success("Product Added Sucessfully To Cart!!");
      //navigate("/dashboard/myBooking");
      setProcessing(false);
    } catch (err) {
      console.log(err);
    }
    setProcessing(false);
  };

  if (isLoading || processing) return <LoadingSpinner />;

  return (
    <div className="bg-white mt-3 container mx-auto">
      <Helmet>
        <title>SamNexus || Details</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 ">
        {/* Job Details */}

        <div className="col-span-2 border p-6">
          <img src={singleProduct?.image_url} alt="" />
        </div>

        <div className=" col-span-2 px-4 py-7  rounded-md shadow-md">
          <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full ">
            Status:{" "}
            <button>
              {new Date(singleProduct?.registration_end_date) > new Date()
                ? "Ongoing"
                : "Closed"}
            </button>
          </span>
          <div>
            <h1 className="mt-2 text-xl md:text-2xl font-semibold text-gray-800 ">
              {singleProduct?.title}
            </h1>

            <p className="mt-2 text-sm text-gray-600 ">
              {/* {singleProduct?.description}. */}
              Rating: ...
            </p>

            <p className="mt-2 text-sm md:text-base text-gray-600 ">
              Brand:{" "}
              <span className="text-blue-500 font-semibold">
                {singleProduct?.brandName}.
              </span>
            </p>
            <p className="mt-2 text-sm md:text-base text-gray-600 ">
              Category:{" "}
              <span className="text-blue-500 font-semibold">
                {singleProduct?.category}.
              </span>
            </p>
            <p className="mt-4 text-sm md:text-base text-gray-600 ">
              Price:{" "}
              <span className="text-blue-500 font-semibold">
                {singleProduct?.productPrice} TK.
              </span>
            </p>

            <p className="mt-2 text-sm md:text-base text-gray-600 ">
              Highlights:{" "}
              <span>
                Country of Origin: <b>Saudi Arab</b>
              </span>
            </p>

            <div className=" flex mt-6 md:mt-8 gap-3">
              <button
                //onClick={handleModalOpen}
                onClick={handleSubmit}
                
                //disabled={room?.booked === true}
                className={`px-4 py-2 font-bold text-white  bg-slate-700 rounded `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 lg:w-6 lg:h-6 mr-2 text-slate-200 inline"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                    data-original="#000000"
                  ></path>
                </svg>
                Add To Cart
              </button>
              <button
                //onClick={handleModalOpen}
                //disabled={room?.booked === true}
                className={`px-4 py-2 font-bold text-white bg-slate-700 rounded `}
              >
                Add To List
              </button>
            </div>

            {/* "Book Now" */}
            {/* Modal for payment */}
            <BookingModal
              refetch={refetch}
              isOpen={isOpen}
              closeModal={closeModal}
              bookingInfo={{
                ...singleProduct,
                price: singleProduct?.registration_fee,
                student: {
                  name: user?.displayName,
                  email: user?.email,
                  image: user?.photoURL,
                },
              }}
            ></BookingModal>
          </div>
        </div>
        <div className="py-4 px-2">
          <h1 className="text-2xl">Related Products</h1>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
