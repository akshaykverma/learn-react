import React from "react";
import UserContext from "./UserContext";
import { useState } from "react";

const UserContextProvider = ({children}) => {

    // shared data from provider
    // this data can also come from an API call
    const [user, setUser] = useState(null);

    return (
        
        // provider is the one that wraps 
        // all the components that need the data (user)
        <UserContext.Provider value = {{user, setUser}}>

             {/* this can be any other components
             within provider all the components will 
             have access to the provided data (user)  */}
            {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider;