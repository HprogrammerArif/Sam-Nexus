import { Helmet } from 'react-helmet-async'
import Carousel from './Banner/Carousel'
import Rooms from './Session/Session'
import Tutor from './Tutor/Tutor'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>StayVision | Homes</title>
      </Helmet>
      <Carousel></Carousel>
      {/* Categories section  */}
      {/* <Categories /> */}
      {/* Rooms section */}
      <Rooms />
      <Tutor></Tutor>
    </div>
  )
}

export default Home
