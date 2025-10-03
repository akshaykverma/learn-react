import { useEffect, useState } from "react";

/**
 * Custom Hook: useCurrencyInfo
 * 
 * Custom hooks are JavaScript functions that:
 * 1. Start with "use" (React convention)
 * 2. Can call other hooks inside them
 * 3. Allow logic reuse across components
 * 4. Return data/functions that components can use
 */
function useCurrencyInfo(currency) {
    // State to store API response data
    // Initialize with empty object to prevent undefined errors
    const [data, setData] = useState({});

    // useEffect: Side effect hook for API calls, subscriptions, etc.
    useEffect(() => {
        // Fetch currency exchange rates from API
        fetch(`https://open.er-api.com/v6/latest/${currency}`)
            .then((res) => res.json()) // Parse JSON response
            .then((res) => setData(res["rates"])); // Extract rates object
            
        // Note: No error handling - production code should include try/catch
    }, [currency]); // Dependency array: re-run when currency changes
    
    console.log(data); // Debug: log fetched data
    
    // Return data for consuming components
    // Components can destructure or use directly
    return data;
}

export default useCurrencyInfo;