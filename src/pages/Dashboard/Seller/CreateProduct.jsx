import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../api/utils";
import toast from "react-hot-toast";
// import { useMutation } from "@tanstack/react-query";

const CreateProduct = () => {
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // //create use mution func to fetch data from server
  // const { mutateAsync } = useMutation({
  //   mutationFn: async (roomData) => {
  //     loading(true)

  //     const { data } = await axiosSecure.post(`/room`, roomData);
  //     return data;
  //   },
  //   onSuccess: () => {
  //     Swal.fire({
  //       position: "top-end",
  //       icon: "success",
  //       title: `Product Added Sucessfully`,
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });

  //     form.reset();
  //     navigate("/dashboard/viewAllProducts");
  //     setLoading(false);

  //     console.log("Data Saved Successfully..");
  //     toast.success('Room Added Successfully!!')
  //     navigate('/dashboard/my-listings')
  //     setLoading(false)
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //     toast.error(err.message);
  //   }
  // });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const brandName = form.brand.value;
    const category = form.category.value;
    const size = form.size.value;
    const color = form.color.value;
    // const sellerName = form.sellerName.value;
    // const sellerEmail = form.sellerEmail.value;
    const productPrice = form.productPrice.value;
    const discount = form.discount.value;
    const image = form.image.files[0];
    const description = form.description.value;
    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
    //send data to backend or server
    if (user && user.email) {
      try {
        setLoading(true);
        // 1. Upload image and get image url
        const image_url = await imageUpload(image);
        // const image_url = 'https://i.ibb.co.com/4mh05Fp/cat-lover.jpg'
        console.log(image_url);

        const newProduct = {
          title,
          brandName,
          category,
          size,
          color,
          productPrice,
          discount,
          image_url,
          description,
          status: "pending",
          seller,
          date: new Date(),
        };
        console.log(newProduct);

        axiosSecure.post("/product", newProduct).then((res) => {
          console.log(res.data);

          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Product Added Sucessfully`,
              showConfirmButton: false,
              timer: 1500,
            });

            form.reset();
            navigate("/dashboard/viewAllProducts");
            setLoading(false);
          }
        });
      } catch (err) {
        console.log(err);
        toast.error(err.message);
        setLoading(false);
      }

     
    }
  };

  return (
    <div>
      <Helmet>
        <title>Add Products || SamNexus</title>
      </Helmet>
      <section className="py-6 lg:py-10 bg-gradient-to-l from-green-100 to-violet-200 text-white">
        <form
          onSubmit={handleAddProduct}
          noValidate=""
          action=""
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-4 p-6 w-[90%] mx-auto rounded-md shadow-sm bg-slate-50">
            <h2 className="text-xl md:text-2xl col-span-4 text-center bg-gradient-to-r from-green-700 to-violet-800 bg-clip-text text-transparent font-bold">
              <Typewriter words={["Add Products"]} loop={true} />
              ..
            </h2>
            <p className="text-center text-slate-900 col-span-4 px-2 mb-4">
              You can add any sort of Session you like. Make sure you are
              <br />
              providing real info.
            </p>

            <div className="grid grid-cols-6 gap-6 col-span-full text-black">
              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="title" className="text-sm">
                  Product Title
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  required
                  placeholder="Enter Title"
                  className="w-full rounded-md text-gray-900 p-2 bg-slate-200"
                />
              </div>

              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="brand" className="text-sm">
                  Brand
                </label>
                <input
                  id="brand"
                  type="text"
                  name="brand"
                  required
                  placeholder="Manfare"
                  className="w-full rounded-md text-gray-900 p-2 bg-slate-200"
                />
              </div>

              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="category" className="text-sm">
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  name="category"
                  required
                  placeholder="T-shirt"
                  className="w-full rounded-md  text-gray-900 p-2 bg-slate-200"
                />
              </div>

              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="size" className="text-sm">
                  Size
                </label>
                <input
                  id="size"
                  type="text"
                  name="size"
                  required
                  placeholder="xs, s, m, l, xl, xxl"
                  className="w-full rounded-md  text-gray-900 p-2 bg-slate-200"
                />
              </div>

              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="color" className="text-sm">
                  Color
                </label>
                <input
                  id="color"
                  type="text"
                  name="color"
                  required
                  placeholder="Black"
                  className="w-full rounded-md  text-gray-900 p-2 bg-slate-200"
                />
              </div>

              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="sellerName" className="text-sm">
                  Seller Name
                </label>
                <input
                  id="sellerName"
                  type="text"
                  required
                  defaultValue={user?.displayName || ""}
                  name="sellerName"
                  disabled
                  className="w-full rounded-md p-2 text-gray-900 bg-slate-200"
                />
              </div>

              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="sellerEmail" className="text-sm">
                  Seller Email
                </label>
                <input
                  id="sellerEmail"
                  type="email"
                  name="sellerEmail"
                  defaultValue={user?.email || ""}
                  disabled
                  className="w-full rounded-md p-2 text-gray-900 bg-slate-200"
                />
              </div>

              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="productPrice" className="text-sm">
                  Product Price
                </label>
                <input
                  id="productPrice"
                  type="number"
                  name="productPrice"
                  required
                  placeholder="100"
                  className="w-full rounded-md  text-gray-900 p-2 bg-slate-200"
                />
              </div>

              <div className="col-span-full sm:col-span-3 ">
                <label htmlFor="discount" className="text-sm">
                  Discount
                </label>
                <input
                  id="discount"
                  type="number"
                  name="discount"
                  disabled
                  placeholder="0"
                  className="w-full rounded-md  text-gray-900 p-2 bg-slate-200"
                />
              </div>

              <div className="col-span-full sm:col-span-3 ">
                <div>
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
              </div>

              <div className="col-span-full">
                <label htmlFor="description" className="text-sm">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Description"
                  name="description"
                  required
                  className="w-full rounded-md p-2 text-gray-900 bg-slate-200"
                ></textarea>
              </div>

              <div className="col-span-full sm:col-span-6 ">
                <input
                  id="Add"
                  type="submit"
                  name="button"
                  value="Add/submit"
                  className="w-full cursor-pointer py-2 border mt-4 rounded-md focus:ring focus:ring-opacity-75 btn text-slate-950 bg-gradient-to-r from-green-400 to-red-400 border-gray-700"
                />
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default CreateProduct;
