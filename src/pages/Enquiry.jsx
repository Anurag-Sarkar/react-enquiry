import Input from "../components/Input"
import { useState } from "react"
import { motion } from "framer-motion"
import {useNavigate} from 'react-router-dom'
import {axiosInstance} from "../utils/axios"
import Options from "../components/Options"

const Enquiery = () => {
    const navigator = useNavigate()
    const course = ["Java","Python","Web Dev","C","CPT","Data Science","DSA","DBMS","Android"]
    const years = ["1st","2nd","3rd","4th","Passout","School",]
    const count = ["1","2","3","4","5+"]
  
    const [name, setName] = useState('')
    const [nameErr, setNameErr] = useState(false)
    const [contact, setContact] = useState('')
    const [contactErr, setContactErr] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState(new Set())
    const [selectedYear, setSelectedYear] = useState(new Set())
    const [selectedCount, setSelectedCount] = useState(new Set())
    const [isSubmitting, setIsSubmitting] = useState(false)

    function handleCountSelection(count){
        setSelectedCount(new Set([count]))
    }

    function handleYearSelection(year){
        console.log(selectedYear)
        setSelectedYear(new Set([year]))
    }

    function handleCourseSelection(course){
      setSelectedCourse((prevCourse) => {
        const newSet = new Set(prevCourse);
        if (newSet.has(course)) {
          newSet.delete(course);
        } else {
          newSet.add(course);
        }
        return newSet;
      });
    }

    const handleNameInput = (val)=>{
        setName(val)
        setNameErr(false)
    }

    const handelContactInput = (val) => {
        if (!/^\d*$/.test(val)) return setContactErr(true); 
        setContact(val);
        setContactErr(false);
      };

    const submitFeedBack = async()=>{
      try{
        if(!name || name.length > 30) return setNameErr(true)
        if(!contact || !/^\d{10}$/.test(contact) ) return setContactErr(true)
        if(Array.from(selectedCourse).length == 0) return
        if(!selectedCount) return
        if(!selectedYear) return

        setIsSubmitting(true)
        
        const data = await axiosInstance.post("/submitFeedback",{
            name:name,
            contact:contact,
            courses:Array.from(selectedCourse),
            year:Array.from(selectedYear).join("").toString(),
            count:Array.from(selectedCount).join("").toString()
        })
        console.log(data)
        navigator("/thank-you")

      }catch(err){
        setIsSubmitting(false)
        console.log(err)
      }
    }

    return (
      <>
          <div className="mx-auto max-w-[60rem] p-5">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5}}>    
              <h1 className="mt-6 text-2xl md:text-4xl font-neue text-neutral-300">Info Form</h1>
              <div className='mt-10'>
                <Input type={"text"} value={name} err={nameErr} func={handleNameInput} title={'Full Name'} placeholder={"Enter your name"}/>
                <Input type={"tel"} value={contact} err={contactErr} func={handelContactInput} title={'Contact Number'} placeholder={"Enter your phone number"}/>    
               
                <Options setFunc={handleCourseSelection} value={selectedCourse} array={course} title={"Course enquired for"}/>
                <Options setFunc={handleYearSelection} value={selectedYear} array={years} title={"College Year"}/>
                <Options setFunc={handleCountSelection} value={selectedCount} array={count} title={"Number of students"}/>
              </div>
              <button onClick={submitFeedBack} className={`${isSubmitting ? 'pointer-events-none opacity-50' : ''} px-10 py-2 bg-brand font-bold text-black rounded text-lg`}>{isSubmitting ? "Submitting" : 'Submit'}</button>
            </motion.div>
          </div>  
      </>
    )
}

export default Enquiery