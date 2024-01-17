import React, { useEffect, useState } from "react";
import {
  getMovieForUpdate,
  getMovies,
  updateMovie,
  deleteMovie,
} from "../../api/movie";
import { useNotification } from "../../hooks";
import UpdateMovie from "../models/UpdateMovie";
import MovieListItem from "../MovieListItem";
import NextAndPrevButton from "../NextAndPrevButton";
import ConfirmModal from "../models/ConfirmModal";

const limit = 10;
let currentPageNo = 0;

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { updateNotification } = useNotification();

  const fetchMovies = async (pageNo) => {
    const { error, movies } = await getMovies(pageNo, limit);
    if (error) updateNotification("error", error);

    if (!movies.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }

    setMovies([...movies]);
  };

  const handleOnNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchMovies(currentPageNo);
  };

  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);

    currentPageNo -= 1;
    fetchMovies(currentPageNo);
  };

  const handleOnEditClick = async ({ id }) => {
    const { movie, error } = await getMovieForUpdate(id);
    if (error) return updateNotification("error", error);
    setSelectedMovie(movie);
    setShowUpdateModal(true);
  };
  const handleOnDeleteClick = (movie) => {
    setSelectedMovie(movie);
    setShowConfirmModal(true);
  };

  const handleOnDeleteConfirm = async () => {
    const { error, message } = await deleteMovie(selectedMovie.id);

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    hideConfirmModal();
    fetchMovies(currentPageNo);
  };

  const handleOnUpdate = (movie) => {
    const updatedMovies = movies.map((m) => {
      if (m.id === movie.id) return movie;
      return m;
    });

    setMovies([...updatedMovies]);
  };

  const hideUpdateForm = () => setShowUpdateModal(false);
  const hideConfirmModal = () => setShowConfirmModal(false);

  useEffect(() => {
    fetchMovies(currentPageNo);
  }, []);

  return (
    <>
      <div className="space-y-3 p-5">
        {movies.map((movie) => {
          return (
            <MovieListItem
              key={movie.id}
              movie={movie}
              onEditClick={() => handleOnEditClick(movie)}
              onDeleteClick={() => handleOnDeleteClick(movie)}
            />
          );
        })}

        <NextAndPrevButton
          className="mt-5"
          onNextClick={handleOnNextClick}
          onPrevClick={handleOnPrevClick}
        />
      </div>

      <UpdateMovie
        visible={showUpdateModal}
        initialState={selectedMovie}
        onSuccess={handleOnUpdate}
        onClose={hideUpdateForm}
      />
      <ConfirmModal
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleOnDeleteConfirm}
        title="Are you sure?"
        subtitle="This action will remove this movie permanently!"
      />
    </>
  );
}
