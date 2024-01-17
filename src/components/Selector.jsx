import React from "react";

export default function Selector({ name, options, value, label, onChange }) {
  return (
    <select
      className="border-2 bg-white dark:bg-main dark:border-dark-subtle border-light-subtle dark:focus:border-white
       focus:border-main p-1 pr-10 outline-none transition rounded bg-transparent text-light-subtle dark:text-dark-subtle dark:focus:text-white focus:text-main"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="">{label}</option>
      {options.map(({ title, value }) => {
        return (
          <option key={title} value={value}>
            {title}
          </option>
        );
      })}
    </select>
  );
}
