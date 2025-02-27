import { NavLink } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const BestOfWeek = () => {
  //const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();

  const { data: allPopularProducts = [], isLoading } = useQuery({
    queryKey: ["all-popular-products"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-popular-products`);
      return data;
    },
  });
  console.log(allPopularProducts);

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div className="bg-gray-50 py-16 md:py-20 mt-4">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
            PRODUCT OF THE WEEK!
          </p>

          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            {allPopularProducts
              .filter((job) => job.status === "pending")
              .slice(0, 3)
              .map((product, index) => (
                <>
                  <div key={index} className="relative lg:row-span-2">
                    <NavLink to={`/products/${product?._id}`}>
                    <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
                    <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                      <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                        <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                          Mobile friendly
                        </p>
                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                          Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                          irure qui lorem cupidatat commodo.
                        </p>
                      </div>
                      <div className="@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                        <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                          <img
                            className="size-full object-cover object-top"
                            src={product?.image_url}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
                  
                  
                    </NavLink>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BestOfWeek;
