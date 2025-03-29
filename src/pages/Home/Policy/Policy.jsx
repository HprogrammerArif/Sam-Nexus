import { LiaDollarSignSolid, LiaHandsHelpingSolid, LiaShippingFastSolid } from "react-icons/lia";

const Policy = () => {
  return (
    <div>
      <section className="p-6 my-6 dark:bg-gray-100 dark:text-gray-800">
        <div className="container grid grid-cols-1 gap-6 mx-auto  xl:grid-cols-3">

          <div className="flex p-4 space-x-4 border-x-2 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
            <LiaShippingFastSolid className="h-9 w-9 dark:text-gray-100" />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="lg:text-lg font-bold leading-none">FREE SHIPPING & RETURN</p>
              <p className="capitalize font-normal text-md">Free shipping on all orders over ৳4999.</p>
            </div>
          </div>

          <div className="flex p-4 border-x-2 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
          <div className="flex justify-center p-2 align-middle  sm:p-4 dark:bg-violet-600 border rounded-full">
            <LiaDollarSignSolid className="h-9 w-9  dark:text-gray-100" />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="lg:text-lg font-bold leading-none">MONEY BACK GUARANTEE</p>
              <p className="capitalize font-normal text-md">100% money back guarantee.</p>
            </div>
          </div>

          <div className="flex p-4 border-x-2 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
            <LiaHandsHelpingSolid className="h-9 w-9 dark:text-gray-100" />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="lg:text-lg font-bold leading-none">ONLINE SUPPORT 24/7</p>
              <p className="capitalize font-normal text-md">Customer our first priority.</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Policy;
