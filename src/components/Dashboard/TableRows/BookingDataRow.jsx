import { format } from "date-fns";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BookingDataRow = ({ orders, order }) => {
  console.log(orders);

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={orders?.image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{orders?.title}</p>
          </div>
        </div>
      </td>

      <td
        title={orders?.category}
        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
      >
        <p
          title={orders?.category}
          className="text-gray-900 whitespace-no-wrap"
        >
          {orders?.category?.substring(0, 10)}
        </p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {orders?.brandName?.substring(0, 10)}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${orders?.price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
        {orders?.color} & <br />{orders?.quantity}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <p className="text-gray-900 whitespace-no-wrap">
  {order?.status}
</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <Link
          to={`booking-details/${orders.productId}`}
          className="relative cursor-pointer inline-block px-3 py-2 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-xl"
          ></span>
          <span className="relative">Details</span>
        </Link>
      </td>
    </tr>
  );
};

BookingDataRow.propTypes = {
  orders: PropTypes.object,
  order: PropTypes.object,
  refetch: PropTypes.func,
};

export default BookingDataRow;
