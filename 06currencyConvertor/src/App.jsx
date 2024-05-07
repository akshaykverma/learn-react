import { useState } from 'react'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'


import './App.css'

function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(fromCurrency);
  // console.log("currencyInfo : ");
  // console.log(currencyInfo);

  const currencyOptionKeys = Object.keys(currencyInfo);
  // console.log("currencyOptionKeys :");
  // console.log(currencyOptionKeys);

  // swap currency 
  const swap = () => {
    let tmp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tmp); 

    tmp = amount;
    setAmount(convertedAmount);
    setConvertedAmount(tmp);
  }

  // convert currency
  const convertCurrency = () => {
    setConvertedAmount(amount * currencyInfo[toCurrency]);
  }

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.pexels.com/photos/8850999/pexels-photo-8850999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        // as we do not want it go anywhere else
                        e.preventDefault();
                        convertCurrency();
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={currencyOptionKeys}
                            selectCurrency={fromCurrency}
                            onCurrencyChange={currency => setFromCurrency(currency)}
                            onAmountChange={changedAmount => setAmount(changedAmount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={currencyOptionKeys}
                            selectCurrency={toCurrency}
                            onCurrencyChange={currency => setToCurrency(currency)}
                            amountDisabled={true}
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default App
