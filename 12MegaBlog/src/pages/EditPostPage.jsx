import React, { useEffect, useState } from 'react'
import appwrriteService from '../appwrite/config'
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom';


function EditPostPage() {
  
    const [post, setPost] = useState(null);
    
    // getting parameters from the url
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      
        if (slug) {
            appwrriteService.getPost(slug)
                .then(resPost => {
                    if (resPost) {
                        setPost(resPost);
                    }
                });
        }
        else {
            navigate('/');
        }

    }, [slug, navigate])
    

    return  post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPostPage