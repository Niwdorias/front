import React from "react";

export default function RatingStar({ rating }) {
  if (!rating)
    return (
      <p className="text-highlight dark:text-highlight-dark">No reviews</p>
    );

  return (
    <p className="text-highlight dark:text-highlight-dark flex items-center space-x-1">
      <span>{rating}</span>
      <i className="bi bi-star-fill"></i>
    </p>
  );
}
