import { Link } from "react-router-dom";
import PropTypes from "prop-types";


const BookingCard = ({room}) => {
  console.log(room);
  return (
    <div
      //to={`/job/${room._id}`}
      className="w-full max-w-md px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all"
    >
      <div className="flex mt-1 items-center justify-between">
        <span className="px-3 py-1 text-sm text-blue-800 uppercase bg-blue-200 rounded-full ">
          <button>
            {new Date(room?.registration_end_date) > new Date()
              ? "Ongoing"
              : "Closed"}
          </button>
        </span>
        
      </div>

      <div className="flex justify-around flex-col">
        <h1 className="mt-2 text-lg font-semibold text-gray-800 ">
          {room?.title>30? room?.title.substring(0, 50): room?.title}...
        </h1>

        <p title={room?.description} className="mt-2 text-sm text-gray-600 ">
          {room?.description.substring(0, 180)}.........
        </p>
        
        <div className="mt-2 text-sm text-gray-600 ">
            <Link to={`booking-details/${room?._id}`}>
            <button className="px-2 py-1 text-white bg-gradient-to-r from-green-900 to-red-800">
              Details
            </button>
            </Link>
            </div>
        
      </div>
    </div>
  );
};

BookingCard.propTypes = {
  room: PropTypes.object,
};

export default BookingCard;