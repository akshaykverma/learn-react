import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {

    // used to get the data returned from the loader inside the reoute configuration done in main.jsx
    const data = useLoaderData();

    // const [data, setData] = useState([]);

    // useEffect(() => {
    //   fetch('https://api.github.com/users/hiteshchoudhary')
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    //     setData(data);
    //   })
    // }, [])
    

  return (
    <div className='text-center m-4 bg-gray-500 text-white p-4 text-3xl'>Github followers : {data.followers}
    <img src={data.avatar_url} alt='Git Picture' width={300}/>
    </div>
  )
}

export default Github

// function to be used in the loader config of routes done in main.jsx
export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/hiteshchoudhary')
    return response.json();
}