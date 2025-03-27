import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// OTP input  - only numbers
const OTP_DIGITS_COUNT = 5;
function App() {
  const [inputArr, setInputArr] = useState(
    new Array(OTP_DIGITS_COUNT).fill("")
  );
  const refArray = useRef(new Array(OTP_DIGITS_COUNT).fill(null));
  useEffect(() => {
    refArray.current[0]?.focus();
  }, []);
  const handleOnChange = (value, index) => {
    if (isNaN(value)) return;
    const newValue = value.trim();
    const newArr = [...inputArr];
    newArr[index] = newValue.slice(-1);
    setInputArr(newArr);
    newValue && refArray.current[index + 1]?.focus();
  };
  const handleOnKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArray.current[index - 1]?.focus();
    }
  };
  return (
    <div className="app">
      <h1>Validate OTP</h1>
      {inputArr.map((item, index) => (
        <input
          ref={(ref) => (refArray.current[index] = ref)}
          key={index}
          type="text"
          className="otp-input"
          value={inputArr[index]}
          onChange={(e) => handleOnChange(e.target.value, index)}
          onKeyDown={(e) => {
            handleOnKeyDown(e, index);
          }}
        />
      ))}
    </div>
  );
}

export default App;
