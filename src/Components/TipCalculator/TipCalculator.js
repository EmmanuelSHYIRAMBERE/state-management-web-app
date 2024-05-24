import { useState } from "react";
import Button from "../../Button";
import Message from "../../Message";
import "./TipCalculator.css";

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState("");
  const [customerTipAmount, setCustomerTipAmount] = useState(0);
  const [friendTipAmount, setFriendTipAmount] = useState(0);

  const tip = (billAmount * ((customerTipAmount + friendTipAmount) / 2)) / 100;

  function handleReset() {
    setBillAmount("");
    setCustomerTipAmount(0);
    setFriendTipAmount(0);
  }

  return (
    <div className="tipMenu">
      <div className="bill">
        <p>How was the bill?</p>
        <span>
          <input
            type="text"
            onChange={(e) => setBillAmount(Number(e.target.value))}
            placeholder="Bill value"
            value={billAmount}
          />
        </span>
      </div>
      <div className="bill">
        <p>How did you like the service?</p>
        <select
          onChange={(e) => setCustomerTipAmount(Number(e.target.value))}
          value={customerTipAmount}
        >
          <option value="0">Dissatisfied (0%)</option>
          <option value="5">It was ok (5%)</option>
          <option value="10">It was good (10%)</option>
          <option value="20">Absolutely amazing! (20%)</option>
        </select>
      </div>
      <div className="bill">
        <p>How did your friend like the service?</p>
        <select
          onChange={(e) => setFriendTipAmount(Number(e.target.value))}
          value={friendTipAmount}
        >
          <option value="0">Dissatisfied (0%)</option>
          <option value="5">It was ok (5%)</option>
          <option value="10">It was good (10%)</option>
          <option value="20">Absolutely amazing! (20%)</option>
        </select>
      </div>

      {billAmount > 0 && (
        <>
          <Message>
            <p>
              You pay ${billAmount + tip} (${billAmount} + ${tip} tip)
            </p>
          </Message>
          <div className="buttons">
            <Button bgColor="#fff" textColor="#ff00c0" onClick={handleReset}>
              <span>RESET</span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
