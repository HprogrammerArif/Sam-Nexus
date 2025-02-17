import { Link } from "react-router-dom";

const Slide = ({ image, title, discountPrice = 0, price }) => {
  return (
    <div className="max-w-xs rounded-md h-96 shadow-md dark:bg-gray-50 dark:text-gray-800">
	<div className="border h-[65%] w-72">
  <img src={image} alt="" className="object-cover object-center w-full rounded-t-md  dark:bg-gray-500" />
  </div>

	<div className="flex flex-col justify-between p-2 space-y-3">
		<div className="space-y-2">
			<h2 className="text-lg font-semibold tracking-wide">{
        title.length <= 25? title : title.slice(0, 20) + "..." + title.slice(-5)
        }</h2>
			<p className="text-sm">
  {
    <>
      <span className="text-gray-500 line-through text-xs">{discountPrice | 100} ৳</span>
      <span className="text-red-500 font-semibold ml-2">{price} ৳</span>
    </>
  }
</p>

		</div>
		<button type="button" className="flex items-center justify-center w-full  py-1.5 font-semibold tracking-wide rounded-md bg-slate-200 hover:bg-green-600 hover:text-gray-50">Add to Cart</button>
	</div>

</div>
  );
};

export default Slide;
