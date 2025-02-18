import { LiaFacebook, LiaInstagram, LiaLinkedin, LiaTwitter } from "react-icons/lia";
import { NavLink } from "react-router-dom";

const SubNav = () => {
  return (
    <div className="">
      <nav className="bg-green-700 shadow dark:bg-gray-800">
        <div className="container px-6 py-2 mx-auto  md:flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/shop" className="hidden md:block">
            <span className="text-xs text-white">
              FREE SHIPPING! STANDARD SHIPPING ORDERS ৳4999+
            </span>
          </NavLink>

          <div className="flex justify-between  gap-2 md:flex-row-reverse">
            {/* Cart Icon */}

            <NavLink
              className="relative text-gray-700 justify-center items-center flex  p-1 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
              href="#"
            >
              <LiaFacebook className="w-9 h-9 bg-green-50 rounded-full p-0.5" />
            </NavLink>
            <NavLink
              className="relative text-gray-700  p-1 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
              href="#"
            >
              <LiaInstagram className="w-9 h-9 bg-green-50 rounded-full p-0.5"  />
            </NavLink>
            <NavLink
              className="relative text-gray-700  p-1 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
              href="#"
            >
              <LiaTwitter className="w-9 h-9 bg-green-50 rounded-full p-0.5"  />
            </NavLink>
            <NavLink
              className="relative  p-1 text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
              href="#"
            >
              <LiaLinkedin className="w-9 h-9 bg-green-50 rounded-full p-0.5"  />
            </NavLink>

            {/* Navigation Links */}
            <div className="flex space-x-6 justify-center items-center">
              <a
                className="text-gray-50 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
                href="#"
              >
                About Us
              </a>

              <a
                className="text-gray-50 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
                href="#"
              >
                Contact Us
              </a>
              <div className="flex flex-col border-none">
                <select name="language" id="language" className="border-none">
                  <option value="en">English</option>
                  <option value="bn">বাংলা (Bengali)</option>
                </select>
              </div>
              <a
                className="text-gray-50 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
                href="#"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SubNav;
