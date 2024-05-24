import { useEffect, useState } from "react";
import "./CurrencyConverter.css";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleTransferCurrency = async () => {
      setIsLoading(true);

      const result = await fetch(
        `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
      );

      const data = await result.json();

      setConvertedAmount(data);
      setIsLoading(false);
    };

    if (fromCurrency === toCurrency) return setConvertedAmount(amount);

    handleTransferCurrency();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(event) => setAmount(Number(event.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCurrency}
        onChange={(event) => setFromCurrency(event.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(event) => setToCurrency(event.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <p>
          {convertedAmount} {toCurrency}
        </p>
      )}
    </div>
  );
}
