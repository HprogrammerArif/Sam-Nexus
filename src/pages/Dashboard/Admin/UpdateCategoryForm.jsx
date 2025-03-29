import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../../api/utils";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const UpdateCategoryForm = ({
  setIsCategoryModalOpen,
  refetch,
}) => {
  const navigate = useNavigate();
  const {setLoading, loading} = useAuth();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const image = form.image.files[0];
    const description = form.description.value;
    
    

    try {
      setLoading(true);
      // 1. Upload image and get image url
      const image_url = await imageUpload(image);
      // const image_url = 'https://i.ibb.co.com/4mh05Fp/cat-lover.jpg'
      console.log(image_url);

      const newCategory = {
        title,
      description,
      image_url,
        date: new Date(),
      };
      console.log(newCategory);

      axiosSecure.post("/category", newCategory).then((res) => {
        console.log(res.data);

        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Category Added Sucessfully`,
            showConfirmButton: false,
            timer: 1500,
          });

          form.reset();
          setIsCategoryModalOpen(false)
          navigate("/dashboard/manageCategory");
          refetch()
          setLoading(false);
        }
      });
    } catch (err) {
      console.log(err);
      setIsCategoryModalOpen(false)
      toast.error(err.message);
      setLoading(false);
    }

  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full justify-center items-center text-gray-800 rounded-xl bg-gray-50">
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
              //defaultValue={job?.title}
              required
            />
          </div>

          
          <div className="space-y-1 text-sm">
                  <label htmlFor="image" className="block mb-2 text-sm">
                    Select Image:
                  </label>
                  <input
                    required
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
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
              //defaultValue={job?.description}
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
    </div>
  );
};

export default UpdateCategoryForm;
