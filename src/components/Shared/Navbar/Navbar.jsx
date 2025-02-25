import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import avatarImg from "../../../assets/images/placeholder.jpg";

// import 'react-tooltip/dist/react-tooltip.css'

import useAuth from "../../../hooks/useAuth";
import Container from "../Container";
import { FcSettings } from "react-icons/fc";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const [theme, setTheme] = useState("light");
  // const { loading } = useContext(AuthContex);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  // if (loading) {
  //   return <span className="loading loading-bars loading-lg"></span>
  // }

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  console.log(theme);

  const handleLogOut = () => {
    logOut()
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errors = error.message;
        console.log(errors);
      });
  };

  const links = (
    <>
      {/* <li>
        <NavLink to="/">Home</NavLink>
      </li> */}
      {/* <li>
        <NavLink to="/all-foods">All Foods</NavLink>
      </li>
      <li>
        <NavLink to="/food-gallery">Gallery</NavLink>
      </li> */}

      {/* {user && (
        <li className="bg-red-900 text-gray-50 rounded-md">
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )} */}
      {/* <li>
        <NavLink to="/contact">Contact</NavLink>
      </li> */}
      <Link className="mr-3" to="/shop">
        <button className="self-center px-3 py-1.5 font-normal rounded bg-purple-800 text-gray-100">
          Shop
        </button>
      </Link>
    </>
  );

  return (
    <Container>
      <div className="navbar bg-base-100 shadow-sm ">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost mr-0 px-0 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu z-50 menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>

          <a
            rel="noopener noreferrer"
            href="/"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            <div className="flex justify-center items-center">
              <img className="w-8 lg:w-12 mr-2" src={logo} alt="" />
              <span className="font-black text-sm lg:text-xl bg-gradient-to-r from-red-800 to-violet-900 bg-clip-text text-transparent mt-1">
                <span className="ml-2">SAM</span>
                <br />
                Nexus
              </span>
            </div>
          </a>
        </div>
        <div className="navbar-end  text-center">
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          <div className="text-center flex ">
            {user ? (
              <>
                {/* <button
                  className="px-1 lg:px-3 py-0 rounded-md  text-gray-100 lg:font-normal"
                  onClick={handleLogOut}
                >
                  <Link className="bg-violet-900 py-1 px-1 text-sm lg:text-lg lg:px-3 lg:py-2 rounded-md">
                    Logout
                  </Link>
                </button> */}

                <button
                  className="dropdown referrerPolicy: 'no-referrer' dropdown-end z-50 tooltip-left tooltip "
                  data-tip={user?.displayName}
                  title={user?.displayName}
                  //data-tooltip-id="my-tooltip" data-tooltip-content={user.displayName}
                >
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost  btn-circle avatar"
                  >
                    <div className=" w-7 lg:w-10 border border-green-600 rounded-full">
                      <img
                        referrerPolicy="no-referrer"
                        alt="User Profile Photo"
                        src={user && user.photoURL ? user.photoURL : avatarImg}
                        // {user && user.photoURL ? user.photoURL : avatarImg}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box "
                  >
                    <li className="bg-red-900 text-gray-50 rounded-md p-1.5 mb-2 mx-4">
                      <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li className="bg-red-900 text-gray-50 rounded-md p-1.5 mb-2 mx-4">
                      <NavLink to="/profile">
                        <FcSettings /> Update
                      </NavLink>
                    </li>

                    <li
                      className="bg-violet-900 text-gray-50 rounded-md p-1.5 mb-2 mx-4"
                      onClick={handleLogOut}
                    >
                      <NavLink to="/dashboard">Logout</NavLink>
                    </li>

                    {/* <li>
                    <Link to="/add-food-item">Add Food Item</Link>
                  </li>
                  <li>
                    <Link to="/my-added-item">My Added Item</Link>
                  </li> */}
                  </ul>
                </button>
              </>
            ) : (
              <>
                <Link className="mr-3" to="/login">
                  <button className="self-center px-2 py-1 font-normal rounded bg-red-800 text-gray-100">
                    Join Us
                  </button>
                </Link>

                {/* bg-gradient-to-r from-green-400 to-blue-500
                <Link to="/login">
                  <button className="self-center px-3 py-2 font-semibold rounded bg-violet-900 text-gray-100">
                    Login
                  </button>
                </Link> */}
              </>
            )}
            {/* 
            <label className="swap swap-rotate lg:ml-1 mr-0 ">
              this hidden checkbox controls the state
              <input
                onChange={handleToggle}
                type="checkbox"
                className="theme-controller"
              />

              sun icon
              <svg
                className="swap-off fill-current w-6 lg:w-7 lg:h-7 "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              moon icon
              <svg
                className="swap-on fill-current w-9 h-9"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label> */}

            <ul className="flex justify-center items-center">
              <NavLink
                to={"/wishlist"}
                className="max-lg:py-2 px-2 md:px-3 lg:px-4 cursor-pointer"
              >
                <span className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 lg:w-6 lg:h-6 inline"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                      data-original="#000000"
                    ></path>
                  </svg>

                  <span className="absolute left-auto -ml-1 -top-2 rounded-full bg-red-500 px-1 py-0 text-[10px] lg:text-xs text-white">
                    3
                  </span>
                </span>
              </NavLink>

              <NavLink className="max-lg:py-2 px-2 md:px-3 lg:px-4 cursor-pointer">
                <span className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 lg:w-6 lg:h-6 inline"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                      data-original="#000000"
                    ></path>
                  </svg>
                  <span className="absolute left-auto -ml-1 -top-2 rounded-full bg-red-500 px-1 py-0 text-[10px] lg:text-xs text-white">
                    3
                  </span>
                </span>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
