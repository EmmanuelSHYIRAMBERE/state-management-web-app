import { useState } from "react";

import Button from "./Button";
import Message from "./Message";
import TipCalculator from "./Components/TipCalculator/TipCalculator";
import EatAndSplit from "./Components/EatAndSplit/EatAndSplit";
import TextExpander from "./Components/TextExpander/TextExpander";
import Tabbed from "./Components/HowReactWorks/Tabbed";
import CurrencyConverter from "./Components/CurrencyConverter/CurrencyConverter";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <>
      <TipCalculator />
      <TipCalculator />

      <CurrencyConverter />

      <TextExpander
        collapsedNumWords={20}
        expandButtonText="Show text"
        collapseButtonText="Collapse text"
        buttonColor="#ff6622"
        expanded={true}
        className="box"
      >
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>

      <Tabbed />

      <Steps />

      <EatAndSplit />
    </>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep((currentStep) => currentStep - 1);
  }
  function handleNext() {
    if (step < 3) setStep((currentStep) => currentStep + 1);
  }

  return (
    <div>
      <button
        className="close"
        onClick={() => setIsOpen((currentState) => !currentState)}
      >
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <Message step={step}>
            {messages[step - 1]}
            <div className="buttons">
              <Button
                bgColor="#e7e7e7"
                textColor="#333"
                onClick={() => alert(`Lear how to ${messages[step - 1]}`)}
              >
                Learn How
              </Button>{" "}
            </div>
          </Message>

          <div className="buttons">
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              <span>👈</span> Previous
            </Button>
            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
