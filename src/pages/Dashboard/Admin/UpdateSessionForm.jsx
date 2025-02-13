import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// import { categories } from '../Categories/categoriesData'
const UpdateSessionForm = ({
  job,
  handleStatus,
  setIsEditModalOpen,
  refetch,
}) => {
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const registration_fee = parseFloat(form.registration_fee.value);
    const description = form.description.value;
    // const email = form.email.value;
    // const registration_start_date = startDate;
    // const registration_end_date = endDate;
    // const class_start_time = classStartDate;
    // const class_end_date = classEndDate;
    // const status = form.status.value;
    // const session_duration = parseFloat(form.duration.value);

    // const newStudySession = {
    //   title,
    //   description,
    //   registration_start_date,
    //   registration_end_date,
    //   class_start_time,
    //   class_end_date,
    //   tutor_name: user?.displayName,
    //   tutor_email: user?.email,
    //   photo: user?.photoURL,
    //   session_duration,
    //   registration_fee,
    //   status,
    //   purchase_count:0,
    // };

    const newStudySession = {
      title,
      description,
      registration_fee,
    };
    console.log(newStudySession);

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/session/${job?._id}`,
        newStudySession
      );
      console.log(data);
      toast.success("Session Data Updated Successfully!");
      setIsEditModalOpen(false);
      refetch();
      navigate("/dashboard/viewSession");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)] justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1 text-sm">
            <label htmlFor="title" className="block text-gray-600">
              Title
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
              name="title"
              id="title"
              type="text"
              placeholder="Title"
              defaultValue={job?.title}
              required
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="location" className="block text-gray-600">
              Email
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              defaultValue={job?.tutor_email}
              required
              disabled
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="price" className="block text-gray-600">
              Price
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
              name="registration_fee"
              id="registration_fee"
              type="number"
              placeholder="Price"
              defaultValue={job.registration_fee}
              required
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="description" className="block text-gray-600">
              Description
            </label>

            <textarea
              id="description"
              className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 "
              name="description"
              defaultValue={job?.description}
            ></textarea>
          </div>
        </div>

        <button
          onClick={() => handleStatus(job?._id, job?.status, "Approved")}
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateSessionForm;
