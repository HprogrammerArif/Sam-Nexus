import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import TopIntro from "../Session/TopIntro";
import TutorCard from "./TutorCard";
import Container from "../../../components/Shared/Container";

const Tutor = () => {

  const axiosCommon = useAxiosCommon()
  // eslint-disable-next-line no-unused-vars
  //const [params, setParams] = useSearchParams()
  //const category = params.get('category')

  //console.log(category)
  const { data: user = [], isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/user?role=tutor`)

      return data
    },
  })

  console.log(user);
  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
    <div>
      <TopIntro subHeading={"We Provide Best"} heading={"Our Top Rated Tutor"} description={"Our Top Study Metarial is your gateway to extraordinary culinary experiences. We believe that you deserve nothing but the best, which is why we meticulously curate our selection to offer you exceptional flavors"}></TopIntro>

      <div className=" grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {user.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
    </div>
    </Container>
  );
};

export default Tutor;