import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import SubNav from '../components/Shared/SubNav/SubNav'
const Main = () => {
  return (
    <div>
      <SubNav/>
      <Navbar />
      <div className='pt-6 min-h-[calc(100vh-92px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Main
