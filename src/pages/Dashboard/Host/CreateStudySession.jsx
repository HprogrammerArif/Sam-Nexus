import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CreateStudySession = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate();

  const handleAddSession = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const registration_start_date = form.registration_start.value;
    const registration_end_date = form.registration_end.value;
    const class_start_time = form.class_start.value;
    const class_end_date = form.class_end.value;
    const tutor_name = form.tutorName.value;
    const tutor_email = form.tutorEmail.value;
    const session_duration = form.duration.value;
    const registration_fee = form.registration_fee.value;
    const status = form.status.value;

    //send data to backend or server
    if (user && user.email) {
      //send cart item to the database

      const newStudySession = {
        title,
        description,
        registration_start_date,
        registration_end_date,
        class_start_time,
        class_end_date,
        tutor_name: user?.displayName,
        tutor_email: user?.email,
        photo: user?.photoURL,
        session_duration,
        registration_fee,
        status,
        purchase_count:0,
      };
      console.log(newStudySession);


      axiosSecure.post("/session", newStudySession).then((res) => {
        console.log(res.data);

        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `added study session sucessfully`,
            showConfirmButton: false,
            timer: 1500
          });
          // refatch the cart to update the cart items
          //refetch()
          form.reset();
          navigate('/dashboard/viewStudySession')
        }
      });

    } 

    // else {
    //   Swal.fire({
    //     title: "You are not logged in",
    //     text: "Please login to add to the cart?",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Yes, Log In",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       //send the user to  login page

    //       //navigate("/login", { state: { from: location } });
    //     }
    //   });
    // }
  };

  return (
    <div>
      <Helmet>
        <title>Add Study Session || StayVision</title>
      </Helmet>
      <section className="p-10 bg-gradient-to-l from-green-100 to-violet-200 text-white">
        <form
          onSubmit={handleAddSession}
          noValidate=""
          action=""
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 w-[70%] mx-auto rounded-md shadow-2xl bg-gray-800">
            <h2 className="text-3xl col-span-4 text-center bg-gradient-to-r from-green-700 to-violet-800 bg-clip-text text-transparent font-bold">
              <Typewriter words={["Add Study Session"]} loop={true} />
              ..
            </h2>
            <p className="text-center col-span-4 px-4">
              You can add any sort of Session you like. 
               Make sure you are<br />
              providing real info.
            </p>

            <div className="grid grid-cols-6 gap-4 col-span-full">
              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="username" className="text-sm">
                Session Title
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  required
                  placeholder="Enter Title"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700"
                />
              </div>

              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="username" className="text-sm">
                Session duration
                </label>
                <input
                  id="duration"
                  type="text"
                  name="duration"
                  required
                  placeholder="Enter Session Duration"
                  className="w-full rounded-md  text-gray-900 "
                />
              </div>

              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="website" className="text-sm">
                Registration start date
                </label>
                <input
                  id="registration_start"
                  type="date"
                  required
                  name="registration_start"
                  placeholder="Registration start date"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700"
                />
              </div>

              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="website" className="text-sm">
                Registration End date
                </label>
                <input
                  id="registration_end"
                  type="date"
                  required
                  name="registration_end"
                  placeholder="Registration end date"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700"
                />
              </div>

              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="website" className="text-sm">
                Class start date
                </label>
                <input
                  id="class_start"
                  type="date"
                  required
                  name="class_start"
                  placeholder="class start date"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700"
                />
              </div>

              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="website" className="text-sm">
                Class End date
                </label>
                <input
                  id="class_end"
                  type="date"
                  required
                  name="class_end"
                  placeholder="class end date"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700"
                />
              </div>

              

              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="username" className="text-sm">
                Tutor Name
                </label>
                <input
                  id="tutorName"
                  type="text"
                  required
                  defaultValue={user?.displayName || ""}
                  name="tutorName"
                  disabled
                  placeholder="Enter turor name"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-50 focus:ring-violet-400 border-gray-700"
                />
              </div>

              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="website" className="text-sm">
                Tutor Email
                </label>
                <input
                  id="tutorEmail"
                  type="email"
                  name="tutorEmail"
                  defaultValue={user?.email || ""}
                  required
                  disabled
                  placeholder="Enter Tutor Email"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-50 focus:ring-violet-400 border-gray-700"
                />
              </div>

              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="username" className="text-sm">
                Registration fee
                </label>
                <input
                  id="registration_fee"
                  type="number"
                  defaultValue={0}
                  disabled
                  name="registration_fee"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-50 focus:ring-violet-400 border-gray-50"
                />
              </div>

              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="website" className="text-sm">
                Status
                </label>
                <input
                  id="status"
                  type="text"
                  name="status"
                  defaultValue='pending'
                  disabled
                  className="w-full rounded-md text-gray-50  border-none"
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
                  className="w-full rounded-md focus:ring focus:ring-opacity-75  text-black focus:dark:ring-violet-600 dark:border-gray-300"
                ></textarea>
              </div>

              <div className="col-span-full sm:col-span-6 ">
                <input
                  id="Add"
                  type="submit"
                  name="button"
                  value="Add/submit"
                  className="w-full cursor-pointer py-2 border mt-4 rounded-md focus:ring focus:ring-opacity-75 btn text-white bg-gradient-to-r from-green-700 to-red-800 border-gray-700"
                />
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default CreateStudySession;