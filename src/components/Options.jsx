import React from 'react'

const Options = ({ setFunc,value, array, title}) => {
    return (
        <div className="mb-10">
            <p className="text-neutral-300 text-sm md:text-base">{title}</p>
            <div className="w-full flex-wrap flex mt-3 items-center gap-x-4 gap-y-3 justify-left">
                {array.map((i, j) => (
                    <div key={j} onClick={() => setFunc(i)} className={`${value.has(i) ? 'text-black bg-brand border-transparent' : 'text-neutral-500 border-neutral-600'} duration-150 select-none cursor-pointer font-normal border-solid border-2 flex-shrink-0 rounded-full px-4 text-sm md:text-lg py-1`}>{i}</div>
                ))}
            </div>
        </div>
    )
}

export default Options