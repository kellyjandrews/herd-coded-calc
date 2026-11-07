"use client";

import { useState } from "react";

type Operator = "+" | "−" | "×" | "÷";

const keys: {
  label: string;
  kind: string;
  action: "digit" | "operator" | "clear" | "decimal" | "sign" | "percent" | "equals";
}[] = [
  { label: "AC", kind: "utility", action: "clear" },
  { label: "±", kind: "utility", action: "sign" },
  { label: "%", kind: "utility", action: "percent" },
  { label: "÷", kind: "operator", action: "operator" },
  { label: "7", kind: "number", action: "digit" },
  { label: "8", kind: "number", action: "digit" },
  { label: "9", kind: "number", action: "digit" },
  { label: "×", kind: "operator", action: "operator" },
  { label: "4", kind: "number", action: "digit" },
  { label: "5", kind: "number", action: "digit" },
  { label: "6", kind: "number", action: "digit" },
  { label: "−", kind: "operator", action: "operator" },
  { label: "1", kind: "number", action: "digit" },
  { label: "2", kind: "number", action: "digit" },
  { label: "3", kind: "number", action: "digit" },
  { label: "+", kind: "operator", action: "operator" },
  { label: "0", kind: "number zero", action: "digit" },
  { label: ".", kind: "number", action: "decimal" },
  { label: "=", kind: "equals", action: "equals" },
];

function calculate(left: number, right: number, operator: Operator) {
  switch (operator) {
    case "+":
      return left + right;
    case "−":
      return left - right;
    case "×":
      return left * right;
    case "÷":
      return right === 0 ? Number.NaN : left / right;
  }
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) return "Error";
  return String(Number(value.toPrecision(10)));
}

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [pendingOperator, setPendingOperator] = useState<Operator | null>(null);
  const [startFresh, setStartFresh] = useState(false);

  function handleKey(action: (typeof keys)[number]["action"], label: string) {
    if (action === "clear") {
      setDisplay("0");
      setStoredValue(null);
      setPendingOperator(null);
      setStartFresh(false);
      return;
    }

    if (action === "digit") {
      setDisplay((current) => {
        const next =
          startFresh || current === "Error" ? label : current === "0" ? label : current + label;
        return next.replace("-", "").length > 12 ? current : next;
      });
      setStartFresh(false);
      return;
    }

    if (action === "decimal") {
      setDisplay((current) =>
        startFresh || current === "Error" ? "0." : current.includes(".") ? current : `${current}.`,
      );
      setStartFresh(false);
      return;
    }

    if (action === "sign") {
      if (display !== "0" && display !== "Error")
        setDisplay(display.startsWith("-") ? display.slice(1) : `-${display}`);
      return;
    }

    if (action === "percent") {
      if (display !== "Error") setDisplay(formatNumber(Number(display) / 100));
      setStartFresh(true);
      return;
    }

    if (action === "operator") {
      const currentValue = display === "Error" ? 0 : Number(display);
      const nextValue =
        storedValue !== null && pendingOperator && !startFresh
          ? calculate(storedValue, currentValue, pendingOperator)
          : currentValue;
      setDisplay(formatNumber(nextValue));
      setStoredValue(Number.isFinite(nextValue) ? nextValue : null);
      setPendingOperator(label as Operator);
      setStartFresh(true);
      return;
    }

    if (action === "equals" && storedValue !== null && pendingOperator) {
      const result = calculate(storedValue, Number(display), pendingOperator);
      setDisplay(formatNumber(result));
      setStoredValue(null);
      setPendingOperator(null);
      setStartFresh(true);
    }
  }

  return (
    <section className="calculator" aria-label="Basic calculator">
      <div className="calculator-topline">
        <span className="calculator-mark" aria-hidden="true">
          ✳
        </span>
        <span>POCKET MATH</span>
        <span className="online-indicator">
          <span aria-hidden="true" />
          READY
        </span>
      </div>
      <div className="display-panel">
        <span className="display-caption">YOUR TOTAL</span>
        <output className="display-value" aria-label="Calculator display" aria-live="polite">
          {display}
        </output>
      </div>
      <div className="keypad">
        {keys.map(({ label, kind, action }) => (
          <button
            className={`key key-${kind.replace(" ", " key-")}`}
            key={label}
            type="button"
            aria-label={
              action === "operator"
                ? { "÷": "Divide", "×": "Multiply", "−": "Subtract", "+": "Add" }[label]
                : label === "±"
                  ? "Change sign"
                  : label === "%"
                    ? "Percent"
                    : label
            }
            onClick={() => handleKey(action, label)}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="calculator-footer">
        <span>✦</span> Keep it simple.
      </p>
    </section>
  );
}
