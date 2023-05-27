import React from "react";
import { useState } from "react";

function Input({ getInput, specialAlphabets }) {
  const [Input, setInput] = useState("");

  function onChange(event) {
    setInput(event.target.value);
  }

  function onKeyDown(event) {
    if (event.key === "Enter") {
      const InputArr = [];
      const InputToArr = Input.split("");
      for (let i = 0; i < Input.length; i++) {
        if (specialAlphabets.includes(Input[i])) {
          const lastInputToArr = InputArr.slice(-1);
          InputArr.pop();
          InputArr.push(lastInputToArr + Input[i]);
        } else {
          InputArr.push(InputToArr[i]);
        }
      }
      getInput(InputArr);
      setInput("");
    }
  }

  return (
    <div className="Input">
      <input
        className="InputField"
        type="text"
        value={Input}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="เขียนคำเลย ..."
      />
    </div>
  );
}

export default Input;
