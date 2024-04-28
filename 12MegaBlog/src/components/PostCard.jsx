import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({
    $id,
    title,
    featuredImage
}) {

  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>

                {/* here we are using the appwrite service directly
                as we have no put data in the store for this
                if we would have done so then we could have used the store
                to get values */}
                <img src={appwriteService.getFilePreview(featuredImage)} 
                    alt="{title}"
                    className='rounded-xl'/>
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard