import { Helmet } from 'react-helmet-async'
import Carousel from './Slider/Carousel'
import Rooms from './Session/Session'
import Tutor from './Tutor/Tutor'
import Policy from './Policy/Policy'
import Banner from './Banner/Banner'
import FeatureProductCarousel from './FeatureProduct/FeatureProductCarousel'
import Category from './Category/Category'
import NewArrivalsProductCarosole from './NewArrivalsProduct/NewArrivalsProductCarosole'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>StayVision | Homes</title>
      </Helmet>
      <Carousel></Carousel>
      <Policy/>
      <Banner/>
      <FeatureProductCarousel/>
      {/* Categories section  */}
      {/* <Categories /> */}
      {/* Rooms section */}
      <Category/>
      <Rooms />
      {/* <Tutor></Tutor> */}
      <NewArrivalsProductCarosole/>
    </div>
  )
}

export default Home
