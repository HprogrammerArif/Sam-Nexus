import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CreateNotes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleNotes = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;

    console.log(description, title);
    const noteItems = {
      title,
      description,
      email: user?.email,
      name: user?.displayName,
    };

    axiosSecure
      .post("/notes", noteItems)
      .then((res) => {
        console.log(res.data);

        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${title} added successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/manageNotes");
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: `${error.message}`,
          text: "Please login to add to the cart?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Log In",
        }).then((result) => {
          if (result.isConfirmed) {
            //send the user to login page
            navigate("/dashboard/createNotes");
          }
        });
      });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[calc(100vh-306px)]">
        <section className=" p-2 md:p-6 mx-auto min-w-[500px] bg-white rounded-md shadow-md ">
          <h2 className="text-lg font-semibold text-gray-700 capitalize ">
            Upload Materials
          </h2>

          <form onSubmit={handleNotes}>
            <div className="flex flex-col gap-2 mt-4">
              <div>
                <label className="text-gray-700 " htmlFor="title">
                  Title
                </label>
                <input
                  name="title"
                  id="title"
               
                  required
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
            </div>

            <div className="flex justify-between gap-2 mt-4">
              <div>
                <label className="text-gray-700 " htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  value={user?.email}
                  disabled
                  required
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-gray-700 " htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={user?.displayName}
                  disabled
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <div>
                <label className="text-gray-700 " htmlFor="description">
                  Description
                </label>

                <textarea
                  placeholder="Write in details"
                  name="description"
                  id="description"
                  cols="6"
                  rows="4"
                  required
                  className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                ></textarea>
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
    </>
  );
};

export default CreateNotes;
