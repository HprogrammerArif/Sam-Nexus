import Card from "./Card";
import Container from "../../../components/Shared/Container";
import Heading from "../../../components/Shared/Heading";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import TopIntro from "./TopIntro";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Rooms = () => {
  //const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure()

  const { data: allSessions = [], isLoading, refetch } = useQuery({
    queryKey: ["all-sessions"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-sessions`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <TopIntro
        subHeading={"study session"}
        heading={"Our Best Teacher Will Teach You"}
        description={
          "Our Top Study Metarial is your gateway to extraordinary culinary experiences. We believe that you deserve nothing but the best, which is why we meticulously curate our selection to offer you exceptional flavors"
        }
      ></TopIntro>
      {allSessions && allSessions.length > 0 ? (
        <>
          <div className="pt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
            {allSessions.filter(job => job.status ==='Approved').slice(0, 6).map((session) => (
              <Card key={session._id} room={session} />
            ))}
          </div>
          {allSessions.filter(job => job.status ==='Approved').length > 6 && (
            <Link to="/all-session" className="flex justify-center">
              <button className="bg-gray-600  p-2 px-5 text-white">
                Sell All Session
              </button>
            </Link>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
          <Heading
            center={true}
            title="No Study Session Available Right Now!"
            subtitle="Please Wait Untill New Session Start!!."
          />
        </div>
      )}
    </Container>
  );
};

export default Rooms;
