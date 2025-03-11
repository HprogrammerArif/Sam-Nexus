import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import Rating from "react-rating";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const BookingDetails = () => {
  const data = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  // const {
  //   registration_start_date,
  //   _id,
  //   registration_end_date,
  //   title,
  //   description,
  //   tutor_name,
  //   average_rating,
  //   class_start_time,
  //   class_end_date,
  //   session_duration,
  //   registration_fee,

  //   reviews,
  //   tutor_email,

  // } = data;
  // console.log(data);

  const handleRating = (rate) => {
    setRating(rate);
  };
  console.log(rating);

  // const handleReset = () => {
  //   setRating(0);
  // };
  const handleReview = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;

    const studentRivew = {
      // ...data,
      comment,
      rating,
      reviewId: data?._id,
    };

    axiosSecure
      .post("/reviews", studentRivew)
      .then((res) => {
        console.log(res.data);

        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data?.title} added review`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/myBooking")
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "You are not logged in",
          text: "Please login to add to the cart?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Log In",
        }).then((result) => {
          if (result.isConfirmed) {
            //send the user to login page
            navigate("/dashboard/myBooking");
          }
        });
      });
  };

  if (!data) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="flex flex-col md:flex-row justify-around gap-5 items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto bg-gray-50">
      {/* Job Details */}
      <div className="flex-1 px-4 py-7 rounded-md shadow-md md:min-h-[350px]">
        <div className="flex flex-col md:flex-row justify-around gap-5 items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto">
          {/* Job Details */}
          <div className="flex-1 rounded-md md:min-h-[350px]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-light text-gray-800">
                Registration start: {data?.registration_start_date}
              </span>
              <span className="text-sm font-light text-gray-800">
                Registration end: {data?.registration_end_date}
              </span>
            </div>
            <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full">
              Status:{" "}
              <button>
                {new Date(data?.registration_end_date) > new Date()
                  ? "Ongoing"
                  : "Closed"}
              </button>
            </span>
            <div>
              <h1 className="mt-2 text-3xl font-semibold text-gray-800">
                {data?.title}
              </h1>

              <p className="mt-2 text-lg text-gray-600">{data?.description}...</p>
              <p className="mt-6 text-sm font-bold text-gray-600">
                Tutor Details:
              </p>
              <div className="flex items-center gap-5">
                <div>
                  <p className="mt-2 text-sm text-gray-600">
                    Name: {data?.tutor_name}.
                  </p>
                  <p className="mt-2 text-sm text-gray-600">Email: {data?.tutor_email}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    Average rating: {data?.average_rating}
                  </p>
                </div>
                <div className="rounded-full object-cover overflow-hidden w-14 h-14">
                  <img src="" alt="Tutor" />
                </div>
              </div>
              <div className="flex justify-between">
                <p className="mt-3 text-md font-bold text-gray-600">
                  Class start time: {data?.class_start_time}
                </p>
                <p className="mt-3 text-md font-bold text-gray-600">
                  Class end date: {data?.class_end_date}
                </p>
              </div>
              <div>
                <p>
                  Session Duration: <b>{data?.session_duration}</b>
                </p>
                <div>
                  Student Reviews:
                  <ul>
                    {data?.reviews?.map((review, index) => (
                      <li key={index}>
                        <b>{review.student_name}</b> - {review.comment} (Rating:{" "}
                        {review.rating})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-6 text-lg font-bold text-gray-600">
                Fee: ${data?.registration_fee}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Drop Review Form */}
      <section className="p-6 w-full bg-white rounded-md shadow-md flex-1 md:min-h-[350px]">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          Give Review
        </h2>

        <form onSubmit={handleReview}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="price">
                Price
              </label>
              <input
                id="price"
                type="text"
                defaultValue={data?.registration_fee}
                disabled
                name="price"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700" htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                defaultValue={data?.tutor_email}
                disabled
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div>
            <label
              className="text-gray-700 mt-2 font-semibold"
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              type="text"
              required
              //value={comment}
              //onChange={(e) => setComment(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              cols="2"
              rows="2"
            ></textarea>
          </div>
          <div>
            <label
              className="text-gray-700 mt-2 font-semibold"
              htmlFor="reviews"
            >
              Reviews
            </label>
            <div>
              <Rating onClick={handleRating} initialRating={rating} />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Submit Review
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default BookingDetails;
