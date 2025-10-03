# Currency Converter - Custom Hooks & API

## 🎯 Project Overview
Real-time currency converter demonstrating custom hooks and API integration.

## 🔑 Key Concepts

### Custom Hooks
- **Logic Reuse**: Extracting stateful logic
- **Naming Convention**: Must start with "use"
- **Hook Composition**: Using hooks inside custom hooks
- **Return Patterns**: What to expose to components

### API Integration
- **Fetch API**: Making HTTP requests
- **Async Operations**: Handling promises
- **Error Handling**: Graceful failure management
- **Data Transformation**: Processing API responses

## 📝 What You'll Learn

- **Custom Hook Creation**: Building reusable logic
- **API Data Fetching**: Real-world data integration
- **State Management**: Complex state scenarios
- **Component Architecture**: Separation of concerns

## 🔍 Important Code Patterns

### Custom Hook Pattern
```jsx
function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  
  useEffect(() => {
    // API call logic
  }, [currency]);
  
  return data; // Return what components need
}
```

### API Integration
```jsx
fetch(`https://api.example.com/rates/${currency}`)
  .then(res => res.json())
  .then(data => setData(data.rates));
```

### Component Composition
```jsx
<InputBox
  label="From"
  amount={amount}
  onAmountChange={setAmount}
  currencyOptions={Object.keys(currencyInfo)}
/>
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 💡 Key Features

- **Real-time Rates**: Live currency exchange rates
- **Multiple Currencies**: Support for various currencies
- **Bidirectional Conversion**: Swap currencies easily
- **Responsive Design**: Works on all devices

## 🌐 API Integration

- **External API**: Real exchange rate data
- **Error Boundaries**: Handling API failures
- **Loading States**: User feedback during requests
- **Caching Strategy**: Optimizing API calls