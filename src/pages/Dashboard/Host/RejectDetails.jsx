import { Link, useLoaderData } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

const RejectDetails = () => {
  const job = useLoaderData();

  const { feedback, reson } = job || {};
  console.log(job);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)]">
      <section className=" p-2 md:p-6 mx-auto min-w-[500px] bg-white rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          View Rejected Reason
        </h2>

        <form>
          <div className="flex flex-col gap-2 mt-4">
            <div>
              <label className="text-gray-700 " htmlFor="job_title">
                Reason
              </label>
              <input
                id="job_title"
                name="job_title"
                defaultValue={reson}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700 " htmlFor="description">
              Feedback
            </label>
            <textarea
              defaultValue={feedback}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              name="description"
              id="description"
              cols="30"
            ></textarea>
          </div>
          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              <Link to={"/dashboard/viewStudySession"}>Cancle</Link>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default RejectDetails;
