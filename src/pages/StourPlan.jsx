import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function StourPlan() {
   const [activeState,setActiveState] = useState('approve')

  return (
    <div className='flex h-full flex-col gap-3 md:gap-4'>
      <div className="bg-white custom-shadow rounded-md md:py-4 py-3 px-3 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-600 text-base md:text-lg font-medium">
            Standard Tour Plan
          </h1>
          <div className="flex items-center gap-2">
            <span
              onClick={() => setActiveState("approve")}
              className={`w-20 ${
                activeState === "approve"
                  ? "bg-themeblue text-white"
                  : "text-gray-600"
              } cursor-pointer hover:bg-themeblue hover:text-white transition-colors duration-300 flex justify-center items-center text-sm p-1 border rounded-md`}
            >
              Approved
            </span>
            <span
              onClick={() => setActiveState("pending")}
              className={`w-20 ${
                activeState === "pending"
                  ? "bg-themeblue text-white"
                  : "text-gray-600"
              } cursor-pointer hover:bg-themeblue hover:text-white transition-colors duration-300 flex justify-center items-center text-sm p-1 border rounded-md`}
            >
              Pending
            </span>
            <span
              onClick={() => setActiveState("rejected")}
              className={`w-20 ${
                activeState === "rejected"
                  ? "bg-themeblue text-white"
                  : "text-gray-600"
              } cursor-pointer hover:bg-themeblue hover:text-white transition-colors duration-300 flex justify-center items-center text-sm p-1 border rounded-md`}
            >
              Rejected
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to={"/admin/tourplan/add"}
          >
            <button className="md:p-2 p-1.5 bg-themeblue md:text-base text-sm text-white rounded-md">
              Add Tour Plan
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StourPlan