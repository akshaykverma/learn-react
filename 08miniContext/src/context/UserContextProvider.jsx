import React from "react";
import UserContext from "./UserContext";
import { useState } from "react";

/**
 * Context Provider Component
 * 
 * Context API Pattern:
 * 1. Create Context (UserContext.js)
 * 2. Create Provider (this component)
 * 3. Wrap components that need data
 * 4. Consume data with useContext hook
 * 
 * Benefits: Avoids prop drilling, centralizes state
 */
const UserContextProvider = ({children}) => {
    // Shared state that will be available to all child components
    // This data can come from API calls, localStorage, etc.
    const [user, setUser] = useState(null);

    return (
        // Provider component makes data available to component tree
        // Value prop contains all data/functions to share
        <UserContext.Provider value={{user, setUser}}>
            {/* 
             * children prop: All components wrapped by this provider
             * Any nested component can access user state via useContext(UserContext)
             * No need to pass props down multiple levels (prop drilling)
             */}
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;