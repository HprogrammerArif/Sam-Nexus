import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useParams } from "react-router-dom";

const ViewBookedMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  console.log(id);

  const { data: material = [], isLoading } = useQuery({
    queryKey: ["material"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/view-booked-materials/${id}`);
      return data;
    },
  });
  console.log(material);

  

  if (isLoading) return <LoadingSpinner />;
  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">
          View My Booked Session Materials
        </h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {material?.length} Materials
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
                      <span>Session Id</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Email</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Action
                    </th>

                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Reasorse Link
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {material.map((job) => (
                    <tr key={job._id}>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {job?.title?.substring(0, 16)}...
                      </td>

                      <td
                        title={job.materialId}
                        className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap"
                      >
                        {job.materialId?.substring(0, 18)}...
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {job?.email}
                      </td>

                      {/* <td className="px-4 py-4 text-sm  whitespace-nowrap">
                        <img className="w-12" src={job?.imagee} alt="" />
                      </td> */}
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <a href={job?.imagee} target="_blank" download="image.jpg">
                          <img
                            className="w-12"
                            src={job?.imagee}
                            alt="Downloadable Image"
                          />
                        </a>
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <button
                          onClick={() => window.open(job?.imagee, "_blank")}
                          className="text-blue-500 hover:underline"
                        >
                          Download
                        </button>
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <a
                          href={job?.reasorseLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-sm hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                          Open
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewBookedMaterials;
