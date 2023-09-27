import React from 'react'

const TableSkeleton = () => {
  return (
    <div className="pt-8 m-4">
      <table className="border-collapse border border-slate-300 w-full text-lg ">
        <thead>
          <tr className="animate-pulse">
            <th className="py-2">
              <div className="h-6 w-24 bg-gray-300 rounded-md"/>
            </th>
            <th className="py-2">
              <div className="h-6 w-28 bg-gray-300 rounded-md"/>
            </th>
            <th className="py-2">
              <div className="h-6 w-32 bg-gray-300 rounded-md"/>
            </th>
            <th className="py-2">
              <div className="h-6 w-28 bg-gray-300 rounded-md"/>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="animate-pulse">
            <td className="py-2">
              <div className="h-4 w-16 bg-gray-300 rounded-md" />
            </td>
            <td className="py-2">
              <div className="h-4 w-20 bg-gray-300 rounded-md" />
            </td>
            <td className="py-2">
              <div className="h-4 w-24 bg-gray-300 rounded-md" />
            </td>
            <td className="py-2">
              <div className="h-4 w-20 bg-gray-300 rounded-md" />
            </td>
          </tr>
          <tr className="animate-pulse">
            <td className="py-2">
              <div className="h-4 w-16 bg-gray-300 rounded-md" />
            </td>
            <td className="py-2">
              <div className="h-4 w-20 bg-gray-300 rounded-md" />
            </td>
            <td className="py-2">
              <div className="h-4 w-24 bg-gray-300 rounded-md" />
            </td>
            <td className="py-2">
              <div className="h-4 w-20 bg-gray-300 rounded-md" />
            </td>
          </tr>
          <tr className="animate-pulse">
            <td className="py-2">
              <div className="h-4 w-16 bg-gray-300 rounded-md" />
            </td>
            <td className="py-2">
              <div className="h-4 w-20 bg-gray-300 rounded-md" />
            </td>
            <td className="py-2">
              <div className="h-4 w-24 bg-gray-300 rounded-md" />
            </td>
            <td className="py-2">
              <div className="h-4 w-20 bg-gray-300 rounded-md" />
            </td>
          </tr>
          <tr className="animate-pulse">
            <td className="py-2">
              <div className="h-4 w-16 bg-gray-300 rounded-md" />
            </td>
            <td className="py-2">
              <div className="h-4 w-20 bg-gray-300 rounded-md" />
            </td>
            <td className="py-2">
              <div className="h-4 w-24 bg-gray-300 rounded-md" />
            </td>
            <td className="py-2">
              <div className="h-4 w-20 bg-gray-300 rounded-md" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TableSkeleton
