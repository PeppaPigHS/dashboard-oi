import React from 'react'

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <p className="text-teal-500 mb-4 text-3xl sm:text-6xl">DashboardOI</p>
      <div className="flex justify-center">
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      </div>
    </div>
  )
}
