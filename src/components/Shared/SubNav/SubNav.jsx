import {
  LiaFacebook,
  LiaInstagram,
  LiaLinkedin,
  LiaPhoneSolid,
  LiaWhatsapp,
} from "react-icons/lia";
import { Link, NavLink } from "react-router-dom";

const SubNav = () => {
  return (
    <div>
      <nav className="bg-green-700 shadow ">
        <div className="container px-2 lg:px-6 py-2 mx-auto  md:flex justify-between items-center">
          {/* Logo */}

          <div className="flex  justify-between items-center gap-3 lg:gap-6">
            <NavLink to="/shop" className="hidden md:block">
              <span className="text-xs text-white">
                FREE SHIPPING! <br />
                STANDARD SHIPPING ORDERS ৳4999+
              </span>
            </NavLink>
            <div>
              <a href="tel:881608414032" className="text-slate-50">
                24/7 Support <br />
                <span className="text-green-100">+880 1608414032</span>
              </a>
            </div>
          </div>

          <div className="flex justify-between  gap-2 md:flex-row-reverse">
            {/* Cart Icon */}

            <div className="flex justify-center items-center">
              <NavLink
                to={`https://web.facebook.com/profile.php?id=61573231906192&rdid=wtjtWPXNvkscpz5Q&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F18VRPhsNjU%2F%3F_rdc%3D1%26_rdr#`}
                className="relative text-gray-700 justify-center items-center flex p-1  hover:text-gray-600 "
                target="_blank"
                rel="noopener noreferrer"
              >
                <LiaFacebook className="w-7 h-7 lg:w-10 lg:h-10 bg-green-50 rounded-full p-0.5" />
              </NavLink>

              <a
                href="tel:8801630299065"
                className="relative text-gray-700 p-1 hover:text-gray-600"
              >
                <LiaPhoneSolid className="w-7 h-7 lg:w-10 lg:h-10 bg-green-50 rounded-full p-1" />
              </a>
              <a
                href="https://wa.me/8801630299065" // Corrected WhatsApp link
                className="relative text-gray-700 p-1  hover:text-gray-600 "
                target="_blank"
                rel="noopener noreferrer"
              >
                <LiaWhatsapp className="w-7 h-7 lg:w-10 lg:h-10 bg-green-50 rounded-full p-0.5" />
              </a>

              {/* <NavLink
                className="relative  p-1 text-gray-700  hover:text-gray-600 "
                href="#"
              >
                <LiaLinkedin className="w-7 h-7 lg:w-10 lg:h-10 bg-green-50 rounded-full p-0.5" />
              </NavLink> */}
            </div>

            {/* Navigation Links */}
            <div className="flex  justify-center items-center gap-3">
              <Link
                className="text-gray-50  hover:text-blue-500 dark:hover:text-blue-400"
                href="#"
              >
                About Us
              </Link>

              {/* <a
                className="text-gray-50 hidden lg:block  hover:text-blue-500 dark:hover:text-blue-400"
                href="#"
              >
                Contact Us
              </a> */}

              <Link
                className="text-gray-50 hidden lg:block  hover:text-blue-500 dark:hover:text-blue-400"
                to="/login"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SubNav;
