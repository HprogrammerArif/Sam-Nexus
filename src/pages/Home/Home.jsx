import { Helmet } from 'react-helmet-async'
import Carousel from './Slider/Carousel'
import Rooms from './PopularProduct/PopularProduct'
import Policy from './Policy/Policy'
import Banner from './Banner/Banner'
import FeatureProductCarousel from './FeatureProduct/FeatureProductCarousel'
import Category from './Category/Category'
import NewArrivalsProductCarosole from './NewArrivalsProduct/NewArrivalsProductCarosole'
import Partner from './Partner/Partner'
import BestOfWeek from './BestOfWeek/BestOfWeek'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>SamNexus | Homes</title>
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
      <BestOfWeek/>
      {/* <Tutor></Tutor> */}
      <NewArrivalsProductCarosole/>
      
      <Partner/>
    </div>
  )
}

export default Home
