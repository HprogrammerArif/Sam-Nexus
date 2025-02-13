
import PropTypes from "prop-types";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../Shared/LoadingSpinner";
import AdminStatistics from "./AdminStatistics";
import StudentStatistics from "./StudentStatistics";
import TutorStatistics from "./TutorStatistics";
// import AdminStatistics2 from "../Hasan/AdminStatistics2";


const Statistics = () => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return <>
  {role === "admin" && <AdminStatistics></AdminStatistics>}
  {/* {role === "admin" && <AdminStatistics2></AdminStatistics2>} */}
  {role === "tutor" && <TutorStatistics></TutorStatistics>}
  {role === "student" && <StudentStatistics></StudentStatistics>}
  </>;
};

Statistics.propTypes = {
  isLoading: PropTypes.bool,
};

export default Statistics;
