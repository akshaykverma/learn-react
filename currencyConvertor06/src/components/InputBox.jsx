import React, { useId } from 'react'

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "USD",
    amountDisabled = false,
    currencyDisabled = false,
    className = "",
}) {
    //The main purpose of the useId() hook is to generate unique 
    // IDs for HTML form elements. It simplifies the process of 
    // generating unique IDs when creating form inputs and labels in React.
    const amountInputId = useId();

    return (
        // adding custom css class from the input
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>

                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled = {amountDisabled}
                    value = {amount}
                    // here the onChange triggers the method in the parent (onAmountChange)
                    // && is done to check if onAmountChange method referece parameter exists or not
                    // as we cannot set an optional value for a method reference in the props passed inside the component
                    // Number is used to convert the default string value to a number 
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled = {currencyDisabled}
                    >
                        {/* looping through options and key is used for optimizations 
                        during loop in jsx { } -> means the start of the javascript */}

                        {currencyOptions.map(currency => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
