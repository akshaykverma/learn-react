// Reusable Card Component with Props
// Destructuring props with default values: btnText defaults to "visit" if not provided
function Card({username, btnText="visit"}) {
  // Props are read-only - components should never modify their props
  console.log(username); // Debug: shows prop value on each render

  return (
    <>
      {/* Tailwind CSS: Utility classes for responsive design */}
      <div className="relative h-[400px] w-[300px] rounded-md">
        {/* Static image - in real apps, this would be a prop */}
        <img
          src="https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
          alt="AirMax Pro"
          className="z-0 h-full w-full rounded-md object-cover"
        />
        
        {/* CSS Gradient Overlay: Creates visual depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        
        {/* Content Container: Positioned absolutely over image */}
        <div className="absolute bottom-4 left-4 text-left">
          {/* Dynamic Content: Props make component reusable */}
          <h1 className="text-lg font-semibold text-white">{username}</h1>
          
          {/* Static content - could be made dynamic with props */}
          <p className="mt-2 text-sm text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            debitis?
          </p>
          
          {/* Dynamic button text from props with fallback */}
          <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-black">
            {btnText}
          </button>
        </div>
      </div>
    </>
  )
}

export default Card
