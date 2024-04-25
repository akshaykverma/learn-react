import React from 'react'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

function Profile() {

    // taking user as we are not setting data but displaying the data
    const {user} = useContext(UserContext);
    
    if (!user) {
        return <div>Please Login</div>
    }
    return <div>Welcome {user.username}</div>

}

export default Profile