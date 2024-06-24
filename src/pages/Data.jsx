// import {useEffect} from 'react'

import { useEffect, useState } from "react"
import { axiosInstance } from "../utils/axios"
import { SyncLoader } from 'react-spinners'

const Data = () => {

    const [course, setCourse] = useState("")
    const [joining, setJoining] = useState("")
    const [contacted, setContacted] = useState("")
    const [year, setYear] = useState("")
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [feedbackArray, setFeedbackArray] = useState([])
    const [fetchingData, setFetchingData] = useState(false)


    useEffect(() => {
        async function getFeedback() {
            try {
                setFetchingData(true)
                const { data } = await axiosInstance.post("/data", { course, joining, contacted, year, fromDate, toDate, page })
                if (data.total < page && data.total != 0) setPage(data.total)
                setTotalPages(data.total)
                setFeedbackArray(data.data)
                setFetchingData(false)
            } catch (err) {
                console.log(err)
            }

        }
        getFeedback()
    }, [course, joining, contacted, year, fromDate, toDate, page])

    async function updateContactStatus(id, contacted) {
        const data = await axiosInstance.post("/contact", { id, contacted })
        console.log(data)
    }

    return (
        <div className='p-8'>
            <div >
                <h1 className='text-2xl font-neue'>Info Form Data</h1>
            </div>
            <div className="w-full mt-5 overflow-hidden rounded-lg">
                <div className="flex justify-between py-3">
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-3">
                            <p className="font-normal">FROM: </p>
                            <input onChange={(e)=>setFromDate(e.target.value)} className="px-2 py-1 rounded text-sm bg-neutral-900 text-white" type="date" />
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="font-normal">TO: </p>
                            <input onChange={(e)=>setToDate(e.target.value)} className="px-2 py-1 rounded text-sm bg-neutral-900 text-white" type="date" />
                        </div>
                    </div>
                    <div className=" mb-2 text-sm text-neutral-500">
                        {((page - 1) * 15) + 1} - {page * 15} of {totalPages}
                    </div>
                </div>
                <table className="w-full bg-[#101010]">
                    <tbody>
                        <tr className="">
                            <th className="w-[20%] text-sm px-3 pl-8 py-5 border-b-[1px] border-neutral-800 border-solid font-normal text-left">Name</th>
                            <th className="w-[15%] text-sm px-3 py-5 border-b-[1px] border-neutral-800 border-solid font-normal">Contact</th>
                            <th className="w-[20%] text-sm px-3 py-5 border-b-[1px] border-neutral-800 border-solid font-normal">
                                <select onChange={(e) => setCourse(e.target.value)} className="bg-transparent outline-none">
                                    <option value="">Course</option>
                                    <option value="java">Java</option>
                                    <option value="python">Python</option>
                                    <option value="web dev">Web Dev</option>
                                    <option value="c">C</option>
                                    <option value="dsa">DSA</option>
                                    <option value="dbms">DBMS</option>
                                    <option value="android">Android</option>
                                    <option value="data science">Data Science</option>
                                    <option value="cpt">CPT</option>
                                </select>
                            </th>
                            <th className="w-[10%] text-sm px-3 py-5 border-b-[1px] border-neutral-800 border-solid font-normal">
                                <select onChange={(e) => setYear(e.target.value)} className="bg-transparent outline-none">
                                    <option value="">Year</option>
                                    <option value="1st">1st</option>
                                    <option value="2nd">2nd</option>
                                    <option value="3rd">3rd</option>
                                    <option value="4th">4th</option>
                                    <option value="passout">Passout</option>
                                    <option value="school">School</option>
                                </select>
                            </th>
                            <th className="w-[15%] text-sm px-3 py-5 border-b-[1px] border-neutral-800 border-solid font-normal">Date</th>
                            <th className="w-[15%] text-sm px-3 py-5 border-b-[1px] border-neutral-800 border-solid font-normal">
                                <select onChange={(e) => setContacted(e.target.value)} className="outline-none bg-transparent">
                                    <option value="not_contacted">Not Contacted</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="didnt_pick">Didn't Pickup</option>
                                    <option value="out_of_service">Out of service</option>
                                </select>
                            </th>
                            <th className="w-[10%] text-sm px-3 py-5 pr-8 border-b-[1px] border-neutral-800 border-solid font-normal">Count</th>
                        </tr>
                        {fetchingData ? <div ><SyncLoader className="absolute left-1/2 translate-x-[-50%] top-[50%]" color="white" /></div> : feedbackArray.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-sm font-normal text-neutral-400 px-3 py-6 pl-8 border-b-[1px] border-neutral-800 border-solid capitalize">{((page - 1) * 15) + (index + 1)}. {data.name}</td>
                                    <td className="text-sm font-normal text-neutral-400 px-3 py-6 border-b-[1px] border-neutral-800 border-solid text-center">{data.phone}</td>
                                    <td className="text-sm font-normal text-neutral-400 px-3 py-6 border-b-[1px] border-neutral-800 border-solid text-center capitalize ">{data.course.join(", ")}</td>
                                    <td className="text-sm font-normal text-neutral-400 px-3 py-6 border-b-[1px] border-neutral-800 border-solid text-center capitalize">{data.year}</td>
                                    <td className="text-sm font-normal text-neutral-400 px-3 py-6 border-b-[1px] border-neutral-800 border-solid text-center">{new Date(data.date).toLocaleDateString('en-GB', { day: 'numeric', month: "short", year: "2-digit" })}</td>
                                    <td className="text-sm font-normal text-neutral-400 px-3 py-6 border-b-[1px] border-neutral-800 border-solid text-center">
                                        <select onChange={(e) => updateContactStatus(data._id, e.target.value)} className="outline-none bg-transparent">
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
                        )}

                    </tbody>
                </table>
            </div>

            <div className={`${fetchingData ? 'absolute translate-x-[-50%] left-1/2 bottom-20' : ''} cursor-pointer mt-10 flex justify-center gap-5`}>
                {Array.from({ length: Math.ceil(totalPages / 15) }, (_, index) => (
                    <div onClick={() => setPage(index + 1)} className={`${page == index + 1 ? 'bg-brand text-black' : 'bg-neutral-900'} font-normal w-8 h-8 border-neutral-800 rounded  border flex justify-center items-center`} key={index}>{index + 1}</div>
                ))}
            </div>
        </div>
    )
}

export default Data