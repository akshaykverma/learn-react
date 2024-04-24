import { useEffect, useState } from "react";

// Custom Hook created 
// used to fetch data from a GET API for currency
function useCurrencyInfo(currency) {

    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`https://open.er-api.com/v6/latest/${currency}`)
            .then((res) => res.json())
            .then((res) => setData(res["rates"]));
    }, [currency]);
    console.log(data);
    return data;
}

export default useCurrencyInfo;