import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import AddAdvertiseModal from "./AddAdvertiseModal";
import { Link } from "react-router-dom";

const AskAdvertise = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  //for update modal
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  // State to hold the selected job for editing
  const [selectedJob, setSelectedJob] = useState(null);
  const [rejectJob, setRejectedJob] = useState(null);

  const {
    data: advertise = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-advertise-data"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-advertise-data`);
      return data;
    },
  });
  console.log(advertise);


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

  // Function to open modal for category!
  const openCategoryModal = () => {
    //setCategory(job);
    setIsCategoryModalOpen(!false);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="container px-4 mx-auto">
      <div className="mb-4 lg:mb-8 flex justify-start items-center gap-3">
        {/* Accept Button: In Progress */}
        <p className="text-2xl">Add Product For AD</p>
        <button
          //onClick={() => setIsEditModalOpen(true)}
          onClick={() => openCategoryModal()}
          // onClick={() =>
          //   handleStatus(job._id, job.status, "Approved")
          // }
          //disabled={job.status !== "pending"}
          className="disabled:cursor-not-allowed transition-colors duration-200   hover:text-red-500 focus:outline-none "
        >
          <FaPlusCircle className="w-12 h-12 border" />
        </button>
      </div>
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">Total Product for AD</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {advertise.length} Product
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
                        <span>Title/Category</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Image</span>
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
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {
                    // ?.filter((job) => job.status !== "Rejected")
                    advertise?.map((job) => (
                      <tr key={job._id}>
                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          {job.title}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          <img src={job.image_url} alt="" className="w-12" />
                        </td>

                        <td
                          title={job.description}
                          className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap"
                        >
                          {job.description.substring(0, 16)}...
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          ${job.registration_fee}
                        </td>

                        

                        <td className="px-4 py-4 text-sm whitespace-nowrap cursor-pointer">
                          <div className="flex items-center gap-x-6">
                           
                            {/* Status bts: In Progress */}
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

                          
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
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
                                <FaTrash/>
                              </Link>
                            </div>
                          </td>
                        ) : (
                          <FaEdit/>
                        )}
                        </td>
                       
                      </tr>
                    ))}
                </tbody>

                {/* Add Category Modal */}
                <AddAdvertiseModal
                  setIsCategoryModalOpen={setIsCategoryModalOpen}
                  isCategoryModalOpen={isCategoryModalOpen}
                  refetch={refetch}
                ></AddAdvertiseModal>

                {/* Update Modal */}
                {/* <UpdateSessionModal
                  isOpen={isEditModalOpen}
                  setIsEditModalOpen={setIsEditModalOpen}
                  job={selectedJob}
                  refetch={refetch}
                  handleStatus={handleStatus}
                ></UpdateSessionModal> */}

                {/* Reject Modal */}
                {/* <RejectSessionModal
                  isOpen={isRejectModalOpen}
                  setIsRejectModalOpen={setIsRejectModalOpen}
                  job={rejectJob}
                  refetch={refetch}
                  handleStatus={handleStatus}
                ></RejectSessionModal> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AskAdvertise;