
const Input = ({err,value,func,title,placeholder,type}) => {
  return (
    <div className="mb-10">
        <p className="text-neutral-300 mb-1 text-sm md:text-base">{title}</p>
        <input value={value} onInput={(e)=>func(e.target.value)} className={`${err ? 'border-red-600' : 'border-transparent'} border-b-[0.05rem] duration-200 rounded-none  border-solid w-full text-xs md:text-sm bg-neutral-800 outline-none px-3 py-2`} type={type} placeholder={placeholder} />
    </div>
  )
}

export default Input