import React from 'react'
// children is noting just a text for the button
function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-whte',
    className = '',
    // any other properties
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg 
    ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button