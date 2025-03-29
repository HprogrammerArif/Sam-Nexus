import { QueryClient, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  //tan stack query
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { refetch, data: cart = [], isLoading } = useQuery({
    queryKey: ["cart", user?.email],
    //eikhane shudh ekjon user data save korbe na. oneke korbe. that's why user.email
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
    
      onSuccess: () => {
        QueryClient.invalidateQueries(["cart", user?.email]); // Auto-refetch cart
      },
    
  });
  return [cart, refetch, isLoading];
};

export default useCart;
