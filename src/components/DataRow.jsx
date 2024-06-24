import React from 'react'

const DataRow = ({index,data,onChange,page}) => {
  return (
    <tr key={index}>
    <td className="text-sm font-normal text-neutral-400 px-3 py-6 pl-8 border-b-[1px] border-neutral-800 border-solid capitalize">{((page - 1) * 15) + (index + 1)}. {data.name} - {data.takenBy ? (data.takenBy.charAt(0)) : "G"}</td>
    <td className="text-sm font-normal text-neutral-400 px-3 py-6 border-b-[1px] border-neutral-800 border-solid text-center">{data.phone}</td>
    <td className="text-sm font-normal text-neutral-400 px-3 py-6 border-b-[1px] border-neutral-800 border-solid text-center capitalize ">{data.course.join(", ")}</td>
    <td className="text-sm font-normal text-neutral-400 px-3 py-6 border-b-[1px] border-neutral-800 border-solid text-center capitalize">{data.year}</td>
    <td className="text-sm font-normal text-neutral-400 px-3 py-6 border-b-[1px] border-neutral-800 border-solid text-center">{new Date(data.date).toLocaleDateString('en-GB', { day: 'numeric', month: "short", year: "2-digit" })}</td>
    <td className="text-sm font-normal text-neutral-400 px-3 py-6 border-b-[1px] border-neutral-800 border-solid text-center">
        <select onChange={(e)=>onChange(data._id,e.target.value)} className="outline-none bg-transparent">
            <option selected={data.contacted == 'not_contacted'} value="not_contacted">Not Contacted</option>
            <option selected={data.contacted == 'contacted'} value="contacted">Contacted</option>
            <option selected={data.contacted == 'didnt_pick'} value="didnt_pick">Didn't Pickup</option>
            <option selected={data.contacted == 'out_of_service'} value="out_of_service">Out of service</option>
        </select>
    </td>
    <td className="text-sm font-normal text-neutral-400 px-3 py-6 pr-8 border-b-[1px] border-neutral-800 border-solid text-center">{data.count ? data.count : 1}</td>
</tr>
  )
}

export default DataRow