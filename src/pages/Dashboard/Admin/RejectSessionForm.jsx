import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RejectSessionForm = ({
  job,
  handleStatus,
  setIsRejectModalOpen,
  refetch,
}) => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const reson = form.reson.value;
    const feedback = form.feedback.value;

    const rejectedSession = {
      reson,
      feedback,
      rejectdeId: job?._id,
      email: job?.tutor_email,
      title: job?.title,
    };
    console.log(rejectedSession);
    delete rejectedSession._id;

    try {
      const { data } = await axiosSecure.post(
        "/rejected-feedback",
        rejectedSession
      );
      console.log(data);
      toast.success("Rejected Session && Feedback Provided Successfully!");
      setIsRejectModalOpen(false);
      refetch();
      navigate("/dashboard/viewSession");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setIsRejectModalOpen(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-150px)] justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-1 text-sm">
            <label htmlFor="reson" className="block text-gray-600">
              Rejected Reason
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
              name="reson"
              id="reson"
              type="text"
              placeholder="Reject Reason"
              required
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="description" className="block text-gray-600">
              Feedback
            </label>

            <textarea
              id="feedback"
              className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 "
              name="feedback"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          onClick={() => handleStatus(job._id, job.status, "Rejected")}
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
        >
          Send Feedback & Reject
        </button>
      </form>
    </div>
  );
};

export default RejectSessionForm;
