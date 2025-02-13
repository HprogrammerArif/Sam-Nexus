import { MdOutlineScience } from "react-icons/md";

import SalesLineChart2 from "./SalesLineChart2";
import Turbidity from "./Turbidity";
import TDSChart from "./TDSChart";
const AdminStatistics2 = () => {
  return (
    <div>
      <div className="mt-12">
        {/* small cards */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3">
          
          {/* Sales Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
            >
              {/* <FaDollarSign className="w-6 h-6 text-white" /> */}
              <img
                className="w-12 h-12"
                src={`https://www.shutterstock.com/image-vector/water-dissolved-oxygen-do-percentage-600nw-2327281741.jpg`}
              />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans  leading-normal font-semibold text-lg text-blue-gray-600">
                Dissolve oxygen
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                0000
              </h4>
            </div>
          </div>

          {/* Total Turbidity */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-green-400 text-white shadow-blue-500/40`}
            >
              {/* <BsFillCartPlusFill className="w-6 h-6 text-white" /> */}
              {/* <MdOutlineScience className="w-12 h-12 text-white" /> */}
              <img
                src={`https://static.vecteezy.com/system/resources/previews/002/564/319/non_2x/water-drops-thermometer-temperature-nature-liquid-blue-silhouette-style-icon-free-vector.jpg`}
                alt=""
                className="w-12 h-12 "
              />
            </div>

            <div className="p-4 text-right">
              <p className="block antialiased font-semibold text-lg leading-normal text-blue-gray-600">
                Water temperature
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                -127.00 C
              </h4>
            </div>
          </div>

          {/* Air temperature */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-red-600 to-green-400 text-white shadow-green-500/40`}
            >
              {/* <FaUserAlt className="w-6 h-6 text-white" /> */}
              <img
                src={`https://static.vecteezy.com/system/resources/previews/006/689/871/non_2x/hot-temperature-icon-illustration-free-vector.jpg`}
                alt=""
                className="w-12 h-12 "
              />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Air temperature
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {/* {statData?.totalStudent} */}0
              </h4>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-3">
          {/* Total Sales Graph */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden ">
            {/* Render Chart Here */}
            <SalesLineChart2 />
            {/* data={statData?.chartData} will go as a prop */}
          </div>
          {/* Turbidity */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
            <Turbidity />
          </div>

          {/* TDS */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-black shadow-xl overflow-hidden">
            <TDSChart />
          </div>
        </div>

        <div className="mb-12 mt-12 grid gap-y-10 gap-x-6 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3">
          {/* Sales Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
            >
              {/* <FaDollarSign className="w-6 h-6 text-white" /> */}
              <img
                className="w-12 h-12"
                src={`https://static.thenounproject.com/png/3215400-200.png`}
              />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans  leading-normal font-semibold text-lg text-blue-gray-600">
                Current PH
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                7.4
              </h4>
            </div>
          </div>

          {/* Total Turbidity */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
            >
              {/* <BsFillCartPlusFill className="w-6 h-6 text-white" /> */}
              <MdOutlineScience className="w-12 h-12 text-white" />
            </div>

            <div className="p-4 text-right">
              <p className="block antialiased font-semibold text-lg leading-normal text-blue-gray-600">
                Turbidity
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                -408.74
              </h4>
            </div>
          </div>

          {/* TDS Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
            >
              {/* <FaUserAlt className="w-6 h-6 text-white" /> */}
              <img
                src={`https://static.thenounproject.com/png/4358106-200.png`}
                alt=""
                className="w-12 h-12 "
              />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                TDS
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {/* {statData?.totalStudent} */}
                PPM: 0
              </h4>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-3">
          {/* Total Sales Graph */}

          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden ">
            {/* Render Chart Here */}
            <SalesLineChart2 />
            {/* data={statData?.chartData} will go as a prop */}
          </div>

          {/* Turbidity */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
            <Turbidity />
          </div>

          {/* TDS */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-black shadow-xl overflow-hidden">
            <TDSChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics2;
