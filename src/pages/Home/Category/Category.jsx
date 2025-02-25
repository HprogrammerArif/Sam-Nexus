import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import CategoryCard from "./CategoryCard";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const Category = () => {
  const {
    data: categorys = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-category"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-category`);
      return data;
    },
  });
  console.log(categorys);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <section className="m-4 md:m-8 dark:bg-gray-100 dark:text-gray-800">
        <div className="container mx-auto p-4 my-6 space-y-2 text-center">
          <h2 className="text-5xl font-bold">BROWSE OUR CATEGORIES</h2>
          <p className="dark:text-gray-600">
            Get your favourite one. All ares here.
          </p>
        </div>

        <div className="container mx-auto grid justify-center gap-1 lg:gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
         
					{categorys.map((category, index) => (
    <CategoryCard key={index} category={category} />
  ))}
        </div>
      </section>
    </div>
  );
};

export default Category;
