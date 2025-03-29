import { NavLink } from "react-router-dom";

const CategoryCard = ({category}) => {
	console.log(category);
  return (
    <NavLink to={`/product-category/${category?.title}`}>
      <div className="flex flex-col items-center p-4">
			<img src={category?.image_url} className="w-12 h-12 dark:text-violet-600" alt="" />
			<h3 className="my-3 text-3xl font-semibold">{category?.title}</h3>
			<div className="space-y-1 leading-tight">
				<p>52 Products</p>
			</div>
		</div>
    </NavLink>
  );
};

export default CategoryCard;