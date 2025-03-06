import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const UpdateItem = () => {
  const noteItems = useLoaderData();
  console.log(noteItems);
  const { user } = useAuth();

  const navigate = useNavigate();

  const { title, name, email, description, _id } = noteItems || {};

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    

    const notesData = {   
      title,
      description,
    };

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/update-notes/${_id}`,
        notesData
      );
      console.log(data);
      toast.success("Notes data updated successfully");
      navigate("/dashboard/manageNotes");
    } catch (error) {
      toast.error(error.message);
      console.log("Hi im error from addJob", error.messgae);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Update Notes || Stayvision</title>
      </Helmet>
      <section className="p-10 bg-gradient-to-l from-green-100 to-violet-200 text-white">
        <form
          onSubmit={handleUpdate}
          noValidate=""
          action=""
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 w-[70%] mx-auto rounded-md shadow-2xl bg-gray-800">
            <h2 className="text-3xl col-span-4 text-center bg-gradient-to-r from-green-700 to-violet-800 bg-clip-text text-transparent font-bold">
              <Typewriter words={["Update Your Notes"]} loop={true} />
              ..
            </h2>
            <p className="text-center col-span-4 px-4">
              You can update your notes title and desc, if you would like.{" "}
              <br /> Make sure you are providing real info.
            </p>

            <div className="grid grid-cols-6 gap-4 col-span-full">
              
              <div className="col-span-full">
                <label htmlFor="username" className="text-sm">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  disabled
                  defaultValue={name}
                  placeholder="Enter Food Name"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-50 focus:ring-violet-400 border-gray-700"
                />
              </div>

              <div className="col-span-full">
                <label htmlFor="website" className="text-sm">
                  title
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  defaultValue={title}
                  name="title"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700"
                />
              </div>

              <div className="col-span-full  ">
                <label htmlFor="website" className="text-sm">
                  User Email
                </label>
                <input
                  id="userEmail"
                  type="email"
                  name="userEmail"
                  defaultValue={email}
                  disabled
                  required
                  placeholder="Enter User Email"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-50 focus:ring-violet-400 border-gray-700 "
                />
              </div>

              <div className="col-span-full">
                <label htmlFor="bio" className="text-sm">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Description"
                  name="description"
                  required
                  defaultValue={description}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75  text-black focus:dark:ring-violet-600 dark:border-gray-300"
                ></textarea>
              </div>

              <div className="col-span-full sm:col-span-6 ">
                <input
                  id="Add"
                  type="submit"
                  name="button"
                  value="Update"
                  className="w-full cursor-pointer py-2 border mt-4 rounded-md focus:ring focus:ring-opacity-75 btn text-white bg-gradient-to-r from-green-700 to-violet-800 border-gray-700"
                />
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default UpdateItem;
