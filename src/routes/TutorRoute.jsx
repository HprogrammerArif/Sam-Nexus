import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import useRole from '../hooks/useRole';

const TutorRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'tutor') return children
  return <Navigate to='/dashboard' />
};

export default TutorRoute;

TutorRoute.propTypes = {
  children: PropTypes.element,
}
