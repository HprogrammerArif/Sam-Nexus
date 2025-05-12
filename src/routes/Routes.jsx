import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Main from "../layouts/Main";
import Dashboard from "../layouts/Dashboard";
import UserHome from "../pages/Dashboard/User/UserHome";
import BookingDetails from "../pages/Dashboard/User/BookingDetails";
import ManageNotes from "../pages/Dashboard/User/ManageNotes";
import UpdateItem from "../pages/Dashboard/User/UpdateItem";
import StudyMaterials from "../pages/Dashboard/User/StudyMaterials";
import SellerRoute from "./SellerRoute";
import CreateStudySession from "../pages/Dashboard/Seller/CreateProduct";
import Profile from "../pages/Dashboard/Common/Profile";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import RejectDetails from "../pages/Dashboard/Seller/RejectDetails";
import UploadMaterials from "../pages/Dashboard/Seller/UploadMaterials";
import UploadMaterialForm from "../pages/Dashboard/Seller/UploadMaterialForm";
import ViewMaterials from "../pages/Dashboard/Seller/ViewMaterials";
import UpdateMaterials from "../pages/Dashboard/Seller/UpdateMaterials";
import ViewAllMaterials from "../pages/Dashboard/Admin/ViewAllMaterials";
import BookingMaterials from "../pages/Dashboard/User/BookingMaterials";
import ViewBookedMaterials from "../pages/Dashboard/User/ViewBookedMaterials";
import AdminRoute from "./AdminRoute";
import Statistics from "../components/Statistics/Statistics";
import Campaign from "../pages/Home/Campaign/Campaign";
import Shop from "../pages/Home/Shop/Shop";
import ViewAllProducts from "../pages/Dashboard/Seller/ViewAllProducts";
import UpdatesProduct from "../pages/Dashboard/Seller/UpdatesProduct";
import ManageCategory from "../pages/Dashboard/Admin/ManageCategory";
import Goods from "../pages/Home/CategoryProduct/Goods";
import AskAdvertise from "../pages/Dashboard/Seller/Advertise/AskAdvertise";
import UpdateCategoryDetails from "../pages/Dashboard/Admin/UpdateCategoryDetails";
import ManageAdvertise from "../pages/Dashboard/Admin/ManageAdvertise/ManageAdvertise";
import UpdateAdvertiseProduct from "../pages/Dashboard/Admin/ManageAdvertise/UpdateAdvertiseProduct";
import Books from "../pages/Home/Books/Books";
import ShoppingCart from "../pages/Cart/ShoppingCart/ShoppingCart";
import ProductDetails from "../pages/Home/Common/ProductDetails";
import ShippingCart from "../pages/Cart/ShoppingCart/ShippingCart";
import MyOrders from "../pages/Dashboard/User/MyOrders";
import ProvideFeedback from "../pages/Dashboard/User/ProvideFeedback";

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
        path: "/products/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/campaign",
        element: <Campaign />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/cart",
        element: <ShoppingCart />,
      },
      {
        path: "/shipping",
        element: <ShippingCart />,
      },
      {
        path: "/product-category/:category",
        element: <Goods/>,
      },
      {
        path: "/shop",
        element: <Shop />,
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
        path: "manageCategory",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageCategory/>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manageCategory/update/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UpdateCategoryDetails/>
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
      {
        path: "manage-advertise",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageAdvertise></ManageAdvertise>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-advertise/update/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UpdateAdvertiseProduct/>
            </AdminRoute>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/session/${params.id}`),
      },

      //STUDENT ROUTE
      {
        path: "myOrders",
        element: (
          <PrivateRoute>
            <MyOrders />
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
        path: "provideFeedback",
        element: (
          <PrivateRoute>
            <ProvideFeedback/>
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

      //SELLER ROUTE
      {
        path: "createProduct",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <CreateStudySession></CreateStudySession>
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "viewAllProducts",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <ViewAllProducts />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "advertisement",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <AskAdvertise/>
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "viewAllProducts/update/:id",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <UpdatesProduct />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "viewStudySession/rejectDetails/:id",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <RejectDetails></RejectDetails>
            </SellerRoute>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/rejectDetails/${params.id}`),
      },

      {
        path: "uploadMaterials",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <UploadMaterials></UploadMaterials>
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "uploadMaterials/uploadDetails/:id",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <UploadMaterialForm></UploadMaterialForm>
            </SellerRoute>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/uploadDetails/${params.id}`),
      },
      {
        path: "viewMaterials",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <ViewMaterials></ViewMaterials>
            </SellerRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "viewMaterials/updateMaterials/:id",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <UpdateMaterials></UpdateMaterials>
            </SellerRoute>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/updateMaterials/${params.id}`),
      },
    ],
  },
]);
