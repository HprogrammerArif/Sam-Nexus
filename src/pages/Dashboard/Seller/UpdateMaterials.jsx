import { useLoaderData, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { imageUpload } from "../../../api/utils";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const UpdateMaterials = () => {
  const job = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("Upload Image");

  //create use mution func to store study materials data in db
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (updateMaterials) => {
      const { data } = await axiosSecure.put(
        `/update-materials/${job?.materialId}`,
        updateMaterials
      );
      return data;
    },
    onSuccess: () => {
      console.log("Material Data Updated Successfully..");
      toast.success("Material Data Updated Successfully..!!");
      navigate("/dashboard/viewMaterials");
      setLoading(false);
    },
  });

  //Form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.title.value;
    const email = form.email.value;
    const reasorseLink = form.link.value;
    const image = form.image.files[0];
    const materialId = form.id.value;

    try {
      const image_url = await imageUpload(image);
      console.log(image_url);

      const updateMaterials = {
        title,
        materialId,
        email,
        reasorseLink,
        imagee: image_url,
      };
      console.table(updateMaterials);

      //Post request to server
      await mutateAsync(updateMaterials);
      //console.log("response of post method =>", result);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  //handle image change
  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };
  console.log(handleImage);

  const { materialId, title, email, reasorseLink } = job || {};
  console.log(job);

  if (loading || isPending) return <LoadingSpinner />;
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)]">
      <section className=" p-2 md:p-6 mx-auto min-w-[500px] bg-white rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Upload Materials
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mt-4">
            <div>
              <label className="text-gray-700 " htmlFor="title">
                Title
              </label>
              <input
                id="title"
                name="title"
                defaultValue={title}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-between gap-2 mt-4">
            <div>
              <label className="text-gray-700 " htmlFor="id">
                Session Id
              </label>
              <input
                id="id"
                name="id"
                disabled
                defaultValue={materialId}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                defaultValue={email}
                disabled
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className=" p-4 bg-white w-full  m-auto rounded-lg flex justify-between items-center">
            <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
              <div className="flex flex-col w-max mx-auto text-center">
                <label>
                  <input
                    className="text-sm cursor-pointer w-36 hidden"
                    type="file"
                    name="image"
                    onChange={(e) => handleImage(e.target.files[0])}
                    id="image"
                    accept="image/*"
                    hidden
                  />
                  <div className="bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500">
                    {imageText.length > 20
                      ? imageText.split(".")[0].slice(0, 20) +
                        "...." +
                        imageText.split(".")[1]
                      : imageText}
                  </div>
                </label>
              </div>
            </div>
            <div className="h-16 w-16 object-cover overflow-hidden flex items-center">
              {imagePreview && <img src={imagePreview}></img>}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <div>
              <label className="text-gray-700 " htmlFor="link">
                Reasorse Link
              </label>
              <input
                id="link"
                name="link"
                required
                type="url"
                defaultValue={reasorseLink}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateMaterials;
