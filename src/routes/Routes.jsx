import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import SessionDetails from "../pages/Home/Session/SessionDetails";
import Main from "../layouts/Main";
import Dashboard from "../layouts/Dashboard";
import UserHome from "../pages/Dashboard/Guest/UserHome";
import MyBookings from "../pages/Dashboard/Guest/MyBookings";
import BookingDetails from "../pages/Dashboard/Guest/BookingDetails";
import CreateNotes from "../pages/Dashboard/Guest/CreateNotes";
import ManageNotes from "../pages/Dashboard/Guest/ManageNotes";
import UpdateItem from "../pages/Dashboard/Guest/UpdateItem";
import StudyMaterials from "../pages/Dashboard/Guest/StudyMaterials";
import TutorRoute from "./TutorRoute";
import CreateStudySession from "../pages/Dashboard/Seller/CreateProduct";
import Profile from "../pages/Dashboard/Common/Profile";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AllSession from "../pages/Home/Session/AllSession";
import ViewAllSession from "../pages/Dashboard/Seller/ViewAllSession";
import UpdateSession from "../pages/Home/Session/UpdateSession";
import ViewAllSessionByAdmin from "../pages/Dashboard/Admin/ViewAllSessionByAdmin";
import RejectDetails from "../pages/Dashboard/Seller/RejectDetails";
import UploadMaterials from "../pages/Dashboard/Seller/UploadMaterials";
import UploadMaterialForm from "../pages/Dashboard/Seller/UploadMaterialForm";
import ViewMaterials from "../pages/Dashboard/Seller/ViewMaterials";
import UpdateMaterials from "../pages/Dashboard/Seller/UpdateMaterials";
import ViewAllMaterials from "../pages/Dashboard/Admin/ViewAllMaterials";
import BookingMaterials from "../pages/Dashboard/Guest/BookingMaterials";
import ViewBookedMaterials from "../pages/Dashboard/Guest/ViewBookedMaterials";
import AdminRoute from "./AdminRoute";
import Statistics from "../components/Statistics/Statistics";
import Campaign from "../pages/Home/Campaign/Campaign";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/campaign",
        element: <Campaign/>,
      },
      {
        path: "/session/:id",
        element: (
          <PrivateRoute>
            <SessionDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-session",
        element: (
          <PrivateRoute>
            <AllSession />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics></Statistics>
          </PrivateRoute>
        ),
      },

      //COMMON ROUTE
      {
        path: "profile",
        element: <Profile />,
      },

      //ADMIN ROUTE ONLY
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <PrivateRoute>
              <UserHome></UserHome>
            </PrivateRoute>
          </AdminRoute>
        ),
      },
      {
        path: "viewSession",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ViewAllSessionByAdmin />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "viewSession/update/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UpdateSession></UpdateSession>
            </AdminRoute>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/session/${params.id}`),
      },
      {
        path: "view-all-materials",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ViewAllMaterials></ViewAllMaterials>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "view-all-materials/updateMaterials/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UpdateMaterials></UpdateMaterials>
            </AdminRoute>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/updateMaterials/${params.id}`),
      },

      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      //STUDENT ROUTE
      {
        path: "myBooking",
        element: (
          <PrivateRoute>
            
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "studyMaterials",
        element: (
          <PrivateRoute>
            <BookingMaterials />
          </PrivateRoute>
        ),
      },

      {
        path: "studyMaterials/view-booked-materials/:id",
        element: (
          <PrivateRoute>
            <ViewBookedMaterials />
          </PrivateRoute>
        ),
      },

      {
        path: "myBooking/booking-details/:id",
        element: (
          <PrivateRoute>
            <BookingDetails></BookingDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_API_URL}/bookings/details/${params.id}`
          ),
      },
      {
        path: "createNotes",
        element: (
          <PrivateRoute>
            <CreateNotes></CreateNotes>
          </PrivateRoute>
        ),
      },
      {
        path: "manageNotes",
        element: (
          <PrivateRoute>
            <ManageNotes></ManageNotes>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/updateNotes/:id",
        element: (
          <PrivateRoute>
            <UpdateItem></UpdateItem>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/note/${params.id}`),
      },
      {
        path: "studyMaterials",
        element: (
          <PrivateRoute>
            <StudyMaterials></StudyMaterials>
          </PrivateRoute>
        ),
      },



      //TUTOR ROUTE
      {
        path: "createProduct",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <CreateStudySession></CreateStudySession>
            </TutorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "viewStudySession",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <ViewAllSession></ViewAllSession>
            </TutorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "viewStudySession/update/:id",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <UpdateSession></UpdateSession>
            </TutorRoute>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/session/${params.id}`),
      },
      {
        path: "viewStudySession/rejectDetails/:id",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <RejectDetails></RejectDetails>
            </TutorRoute>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/rejectDetails/${params.id}`),
      },

      {
        path: "uploadMaterials",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <UploadMaterials></UploadMaterials>
            </TutorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "uploadMaterials/uploadDetails/:id",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <UploadMaterialForm></UploadMaterialForm>
            </TutorRoute>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/uploadDetails/${params.id}`),
      },
      {
        path: "viewMaterials",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <ViewMaterials></ViewMaterials>
            </TutorRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "viewMaterials/updateMaterials/:id",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <UpdateMaterials></UpdateMaterials>
            </TutorRoute>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/updateMaterials/${params.id}`),
      },
    ],
  },
]);
