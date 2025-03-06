
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageNotes = () => {
  const { user } = useAuth();

  // Fetch created notes Data here
  const { data: notes = {}, isLoading, refetch } = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/notes?email=${user.email}`)
      return data
    },
    
  })

  console.log(notes)
  if (isLoading) return <LoadingSpinner />
 

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/notes/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className=" text-center mb-10 bg-gradient-to-r from-green-700 to-violet-800 bg-clip-text text-transparent font-bold">
        <h2 className="text-4xl">Total Created Notes: {notes.length} </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Title</th>
              <th>Descrip</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>${item.title}</td>
                <td>${item.description.length > 20 ? item.description.slice(0, 20) + '......' : item.description}</td>
                <th>
                  <Link
                    //onClick={() => handleDelete(item._id)}
                    to={`/dashboard/updateNotes/${item._id}`}
                    //foodsItem={item}
                    className="btn btn-ghost btn-lg "
                  >
                    <FaEdit className="text-green-600"></FaEdit>
                  </Link>
                </th>
                <th>
                  <Link
                    onClick={() => handleDelete(item._id)}
                    //to={`/update-food-item/${item._id}`}
                    //foodsItem={item}
                    className="btn btn-ghost btn-lg "
                  >
                    <FaTrash  className="text-red-600"></FaTrash>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageNotes;