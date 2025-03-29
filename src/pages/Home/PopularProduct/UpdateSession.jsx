import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import DatePicker from "react-datepicker";
import axios from "axios";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import useRole from "../../../hooks/useRole";

const UpdateSession = () => {
  const navigate = useNavigate();
  const job = useLoaderData();
  const [role] = useRole()
  console.log(role);
  
  const {
    _id,
    title,
    registration_start_date,
    registration_end_date,
    class_start_time,
    class_end_date,
    registration_fee,
    status,
    session_duration,
    description,
  } = job || {};
  //console.log(job);
  
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(
    new Date(registration_start_date) || new Date()
  );
  const [endDate, setEndDate] = useState(
    new Date(registration_end_date) || new Date()
  );


  const [classStartDate, setClassStartDate] = useState(
    new Date(class_start_time) || new Date()
  );
  const [classEndDate, setClassEndDate] = useState(
    new Date(class_end_date) || new Date()
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.job_title.value;
    const email = form.email.value;
    const registration_start_date = startDate;
    const registration_end_date = endDate;
    const class_start_time = classStartDate;
    const class_end_date = classEndDate;
    const registration_fee = parseFloat(form.registration_fee.value);
    const status = form.status.value;
    const session_duration = parseFloat(form.duration.value);
    const description = form.description.value;

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

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/session/${_id}`,
        newStudySession
      );
      console.log(data);
      toast.success("Session Data Updated Successfully!");
      navigate("/dashboard/viewStudySession");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)]">
      <section className=" p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Update a Session
        </h2>

        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="job_title">
                Session Title
              </label>
              <input
                id="job_title"
                name="job_title"
                defaultValue={title}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                disabled
                defaultValue={user?.email}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Registration Start</label>

              <DatePicker
                className="border p-2 rounded-md"
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Registration End Start</label>

              <DatePicker
                className="border p-2 rounded-md"
                selected={endDate}
                onChange={date => setEndDate(date)}
              />
            </div>


            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Class Start</label>

              <DatePicker
                className="border p-2 rounded-md"
                selected={classStartDate}
                onChange={date => setClassStartDate(date)}
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Class End</label>

              <DatePicker
                className="border p-2 rounded-md"
                selected={classEndDate}
                onChange={date => setClassEndDate(date)}
              />
            </div>

            
            <div>
              <label className="text-gray-700 " htmlFor="registration_fee">
              Registration fee
              </label>
              <input
                id="registration_fee"
                defaultValue={registration_fee}
                disabled={role != 'admin'}
                name="registration_fee"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-gray-700 " htmlFor="status">
              Status
              </label>
              <input
                id="status"
                defaultValue={status}
                disabled
                name="status"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            
            <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="username" className="text-sm">
                Session duration
                </label>
                <br />
                <input
                  id="duration"
                  type="text"
                  name="duration"
                  defaultValue={session_duration}
                  required
                  placeholder="Enter Session Duration"
                  className=" rounded-md border py-2 text-gray-900 "
                />
              </div>

           
            
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700 " htmlFor="description">
              Description
            </label>
            <textarea
              defaultValue={description}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              name="description"
              id="description"
              cols="30"
            ></textarea>
          </div>
          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateSession;
