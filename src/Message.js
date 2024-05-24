export default function Message({ step, children }) {
  return (
    <div>
      {typeof step === "number" && (
        <div className="message">
          <h3>Step: {step}</h3> {children}
        </div>
      )}
      {typeof step !== "number" && <div className="message">{children}</div>}
    </div>
  );
}
