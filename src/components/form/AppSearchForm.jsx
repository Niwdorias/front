import React, { useState } from "react";

const defaultInputStyle =
  "dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-main dark:text-white text-lg";
export default function AppSearchForm({
  showResetIcon,
  placeholder,
  inputClassName = defaultInputStyle,
  onSubmit,
  onReset,
}) {
  const [value, setValue] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  const handleReset = () => {
    setValue("");
    onReset();
  };

  return (
    <form className="relative" onSubmit={handleOnSubmit}>
      <input
        type="text"
        className={
          "border-2 transition bg-transparent rounded p-1 outline-none " +
          inputClassName
        }
        placeholder={placeholder}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />

      {showResetIcon ? (
        <button
          onClick={handleReset}
          type="button"
          className="absolute top-1/2 -translate-y-1/2 right-2 text-second dark:text-white"
        >
          <i className="bi bi-x"></i>
        </button>
      ) : null}
    </form>
  );
}
