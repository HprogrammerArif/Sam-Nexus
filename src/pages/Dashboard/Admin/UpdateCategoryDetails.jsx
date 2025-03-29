import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const UpdateCategoryDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { id } = useParams();
  console.log(id, user);

  const {
    data: product = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/category/${id}`);
      return data;
    },
  });
  console.log(product);

  const { _id, title, description, image_url } = product || {};
  console.log(product);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    //const image_url = form.image_url.value;
    
    const updateCategory = {
      title, description, image_url
    };
    console.log(updateCategory);

    try {
      const { data } = await axiosSecure.put(
        `/update-category/${_id}`,
        updateCategory
      );
      console.log(data);
      toast.success("Product Updated Successfully!");
      navigate("/dashboard/manageCategory");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)]">
      <section className=" p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Update a Session
        </h2>

        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1 text-sm">
              <label htmlFor="title" className="block text-gray-600">
                Category Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="title"
                id="title"
                type="text"
                placeholder="Title"
                defaultValue={title}
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                //required
                type="file"
                id="image"
                name="image"
                accept="image/*"
                //defaultValue={image_url}
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
                defaultValue={description}
              ></textarea>
            </div>
          </div>

          <button
            //onClick={() => handleStatus(job?._id, job?.status, "Approved")}
            type="submit"
            className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
          >
            Update
          </button>
        </form>
      </section>
    </div>
  );
};

export default UpdateCategoryDetails;
