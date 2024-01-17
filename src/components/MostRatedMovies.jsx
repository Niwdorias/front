import React, { useEffect, useState } from "react";
import { getMostRatedMovies } from "../api/admin";
import { useNotification } from "../hooks";
import { convertReviewCount } from "../utils/helper";

export default function MostRatedMovies() {
  const [movies, setMovies] = useState([]);

  const { updateNotification } = useNotification();

  const fetchMostRatedMovies = async () => {
    const { error, movies } = await getMostRatedMovies();
    if (error) return updateNotification("error", error);

    setMovies([...movies]);
  };

  useEffect(() => {
    fetchMostRatedMovies();
  }, []);

  return (
    <div className="shadow dark:shadow dark:bg-second p-5 rounded">
      <h1 className="font-semibold text-2xl mb-2 text-main dark:text-white">
        Most Rated Movies
      </h1>
      <ul className="space-y-3">
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <h1 className="text-main font-semibold">{movie.title}</h1>
              <div className="flex space-x-2">
                <i className="bi bi-star" rating={movie.reviews?.ratingAvg}></i>
                <p className="text-light-subtle dark:text-dark-subtle">
                  {convertReviewCount(movie.reviews?.reviewCount)} Reviews
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
