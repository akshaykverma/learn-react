import React, {useId} from 'react'

// forwardRef lets your component expose a DOM node to parent component with a ref.
const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
   // ref is the reference to the parent component
}, ref) {

    const uniqueId = useId();

  return (
    <div className='w-full'>
        {
            label && 
                <label className="block mb-1" htmlFor={uniqueId}>
                    {label}
                </label>
        }
        <input 
            type={type} 
            className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full `}
            
            // attaching the parent ref to this input
            // so that when we make any changes to ref 
            // it will be reflected in the parent
            ref={ref}
            {...props}
            id = {uniqueId}
            />
    </div>
  )
})

export default Input