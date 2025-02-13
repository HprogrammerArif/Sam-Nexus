import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useState } from "react";
import UpdateSessionModal from "./UpdateSessionModal";
import { Link } from "react-router-dom";
import RejectSessionModal from "./RejectSessionModal";

const ViewAllSessionByAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  //for update modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  // State to hold the selected job for editing
  const [selectedJob, setSelectedJob] = useState(null);
  const [rejectJob, setRejectedJob] = useState(null);

  const {
    data: session = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-session"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-session`);
      return data;
    },
  });
  console.log(session);


  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axiosSecure.patch(`/session/${id}`, { status });
      console.log(data);
      return data;
    },
    onSuccess: () => {
      console.log("Wow, data updated");
      toast.success("Updated");
      // refresh ui for latest data
      // refetch()

      // Kothin
      queryClient.invalidateQueries({ queryKey: ["all-session"] });
    },
  });


  // handleStatus
  const handleStatus = async (id, prevStatus, status) => {
    console.log(id, prevStatus, status);
    if (prevStatus === status) return console.log("Sry vai.. hobena");
    await mutateAsync({ id, status });
  };


  // Function to open modal and set the selected job and update it
  const openEditModal = (job) => {
    setSelectedJob(job);
    setIsEditModalOpen(true);
  };

  // Function to open modal and set the selected job and reject it
  const openRejectModal = (job) => {
    setRejectedJob(job);
    setIsRejectModalOpen(true);
  };

  //for delete
  const handleDelete = async (id) => {
    try {
      const { data } = await axiosSecure.delete(`/session/${id}`);
      console.log(data);
      toast.success("Delete Successful");
      refetch();
      //refresh ui
      //getData();
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };


  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">View All Session</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {session.length} Session
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Title</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Email</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Description</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Approved <br /> & Reject
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {session
                    ?.filter((job) => job.status !== "Rejected")
                    .map((job) => (
                      <tr key={job._id}>
                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          {job.title.substring(0, 16)}...
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          {job.tutor_email}
                        </td>

                        <td
                          title={job.description}
                          className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap"
                        >
                          {job.description.substring(0, 8)}...
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          ${job.registration_fee}
                        </td>

                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div
                            className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                              job.status === "Pending" &&
                              "bg-yellow-100/60 text-yellow-500"
                            } ${
                              job.status === "pending" &&
                              "bg-blue-100/60 text-blue-500"
                            } ${
                              job.status === "Approved" &&
                              "bg-emerald-100/60 text-emerald-500"
                            } ${
                              job.status === "Rejected" &&
                              "bg-red-100/60 text-red-500"
                            } `}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                job.status === "Pending" && "bg-yellow-500"
                              } ${job.status === "pending" && "bg-blue-500"} ${
                                job.status === "Approved" && "bg-green-500"
                              } ${job.status === "Rejected" && "bg-red-500"}  `}
                            ></span>
                            <h2 className="text-sm font-normal ">
                              {job.status}
                            </h2>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            {/* Accept Button: In Progress */}
                            <button
                              //onClick={() => setIsEditModalOpen(true)}
                              onClick={() => openEditModal(job)}
                              // onClick={() =>
                              //   handleStatus(job._id, job.status, "Approved")
                              // }
                              disabled={job.status !== "pending"}
                              className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m4.5 12.75 6 6 9-13.5"
                                />
                              </svg>
                            </button>


                            
                            {/* Reject Button */}
                            <button
                            onClick={() => openRejectModal(job)}
                              // onClick={() =>
                              //   handleStatus(job._id, job.status, "Rejected")
                              // }
                              disabled={job.status !== "pending"}
                              className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>





                        {job.status === "Approved" ? (
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                              <button
                                onClick={() => handleDelete(job._id)}
                                className="text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>

                              <Link
                                to={`update/${job._id}`}
                                className="text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              </Link>
                            </div>
                          </td>
                        ) : (
                          ""
                        )}
                      </tr>
                    ))}
                </tbody>

                {/* Update Modal */}
                <UpdateSessionModal
                  isOpen={isEditModalOpen}
                  setIsEditModalOpen={setIsEditModalOpen}
                  job={selectedJob}
                  refetch={refetch}
                  handleStatus={handleStatus}
                ></UpdateSessionModal>

                {/* Reject Modal */}
                <RejectSessionModal
                  isOpen={isRejectModalOpen}
                  setIsRejectModalOpen={setIsRejectModalOpen}
                  job={rejectJob}
                  refetch={refetch}
                  handleStatus={handleStatus}
                ></RejectSessionModal>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewAllSessionByAdmin;
