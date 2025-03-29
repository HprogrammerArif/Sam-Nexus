import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const UpdatesProduct = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { id } = useParams();
  console.log(id, user);

  const {
    data: product = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["seller-product", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/seller-product/${id}`);
      return data;
    },
  });
  console.log(product);

  const {
    _id,
    brandName,
    category,
    color,
    date,
    description,
    discount,
    image_url,
    productPrice,
    email,
    image,
    name,
    size,
    status,
    title,
  } = product || {};
  console.log(product);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const brandName = form.brand.value;
    const category = form.category.value;
    const size = form.size.value;
    const color = form.color.value;
    const productPrice = form.productPrice.value;
    const discount = form.discount.value;
    const description = form.description.value;
    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    const updateProduct = {
      title,
      brandName,
      category,
      size,
      color,
      productPrice,
      description,
    };
    console.log(updateProduct);

    try {
      const { data } = await axiosSecure.put(
        `/update-product/${_id}`,
        updateProduct
      );
      console.log(data);
      toast.success("Product Updated Successfully!");
      navigate("/dashboard/viewAllProducts");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)]">
      <section className=" p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Update a Session
        </h2>

        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div className="col-span-full md:col-span-2 lg:col-span-3">
              <label htmlFor="title" className="text-gray-700 ">
                Product Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                required
                defaultValue={title}
                placeholder="Enter Title"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label htmlFor="brand" className="text-gray-700 ">
                Brand
              </label>
              <input
                id="brand"
                type="text"
                name="brand"
                required
                defaultValue={brandName}
                placeholder="Manfare"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div className="flex flex-col gap-2 ">
              <label htmlFor="category" className="text-gray-700 ">
                Category
              </label>
              <input
                id="category"
                type="text"
                name="category"
                required
                defaultValue={category}
                placeholder="T-shirt"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label htmlFor="size" className="text-sm">
                Size
              </label>
              <input
                id="size"
                type="text"
                name="size"
                required
                defaultValue={size}
                placeholder="xs, s, m, l, xl, xxl"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div className="">
              <label htmlFor="color" className="text-sm">
                Color
              </label>
              <input
                id="color"
                type="text"
                name="color"
                required
                defaultValue={color}
                placeholder="Black"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div className="flex flex-col gap-2 ">
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

            <div>
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

            <div>
              <label htmlFor="productPrice" className="text-sm">
                Product Price
              </label>
              <input
                id="productPrice"
                type="number"
                name="productPrice"
                required
                defaultValue={productPrice}
                placeholder="100"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label htmlFor="discount" className="text-sm">
                Discount
              </label>
              <input
                id="discount"
                type="number"
                name="discount"
                disabled
                defaultValue={discount}
                placeholder="0"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="description" className="text-sm">
              Description
            </label>
            <textarea
              placeholder="Description"
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

export default UpdatesProduct;
