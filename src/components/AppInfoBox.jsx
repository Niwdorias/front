import React from "react";

export default function AppInfoBox({ title, subTitle }) {
  return (
    <div className="shadow dark:shadow dark:bg-second p-5 rounded">
      <h1 className="font-semibold text-2xl mb-2 text-main dark:text-white">
        {title}
      </h1>
      <p className="text-xl text-main dark:text-white">{subTitle}</p>
    </div>
  );
}
