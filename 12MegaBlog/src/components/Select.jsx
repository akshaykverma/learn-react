import React, {useId} from 'react'

function Select({
    options,
    lable,
    className = "",
    ...props
}, ref) {

    const uniqueId = useId();

  return (
    <div className='w-full'>
        {
            lable && 
                <lable className="" htmlFor={uniqueId}>
                </lable>
        }
        <select 
            {...props}
            id ={uniqueId}
            ref = {ref}
            className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full `}
        >
            {options?.map(op => (
                <option key={op} value={op}>
                    {op}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)