import React, { useEffect, useState } from "react";
import { deleteActor, getActors, searchActor } from "../../api/actor";
import { useNotification, useSearch } from "../../hooks";
import AppSearchForm from "../form/AppSearchForm";
import UpdateActor from "../models/UpdateActor";
import NextAndPrevButton from "../NextAndPrevButton";
import ConfirmModal from "../models/ConfirmModal";

let currentPageNo = 0;
const limit = 20;

export default function Actors() {
  const [actors, setActors] = useState([]);
  const [results, setResults] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { updateNotification } = useNotification();
  const { handleSearch } = useSearch();
  const [busy, setBusy] = useState(false);

  const fetchActors = async (pageNo) => {
    const { profiles, error } = await getActors(pageNo, limit);
    if (error) return updateNotification("error", error);

    if (!profiles.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }

    setActors([...profiles]);
  };

  const handleOnNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchActors(currentPageNo);
  };

  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);

    currentPageNo -= 1;
    fetchActors(currentPageNo);
  };

  const handleOnEditClick = (profile) => {
    setShowUpdateModal(true);
    setSelectedProfile(profile);
  };

  const hideUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleOnSearchSubmit = (value) => {
    handleSearch(searchActor, value, setResults);
  };

  const handleOnActorUpdate = (profile) => {
    const updatedActors = actors.map((actor) => {
      if (profile.id === actor.id) {
        return profile;
      }

      return actor;
    });

    setActors([...updatedActors]);
  };

  const handleOnDeleteClick = (profile) => {
    setSelectedProfile(profile);
    setShowConfirmModal(true);
  };

  const handleOnDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteActor(selectedProfile.id);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    hideConfirmModal();
    fetchActors(currentPageNo);
  };

  const hideConfirmModal = () => setShowConfirmModal(false);

  useEffect(() => {
    fetchActors(currentPageNo);
  }, []);

  return (
    <>
      <div className="p-5">
        <div className="flex justify-end mb-5">
          <AppSearchForm
            onSubmit={handleOnSearchSubmit}
            placeholder="Search Actors..."
          />
        </div>
        <div className="grid grid-cols-3 gap-5">
          {results.length
            ? results.map((actor) => (
                <ActorProfile
                  profile={actor}
                  key={actor.id}
                  onEditClick={() => handleOnEditClick(actor)}
                  onDeleteClick={() => handleOnDeleteClick(actor)}
                />
              ))
            : actors.map((actor) => (
                <ActorProfile
                  profile={actor}
                  key={actor.id}
                  onEditClick={() => handleOnEditClick(actor)}
                  onDeleteClick={() => handleOnDeleteClick(actor)}
                />
              ))}
        </div>

        {!results.length ? (
          <NextAndPrevButton
            className="mt-5"
            onNextClick={handleOnNextClick}
            onPrevClick={handleOnPrevClick}
          />
        ) : null}
      </div>

      <ConfirmModal
        visible={showConfirmModal}
        title="Are you sure?"
        subtitle="This action will remove this profile permanently!"
        busy={busy}
        onConfirm={handleOnDeleteConfirm}
        onCancel={hideConfirmModal}
      />

      <UpdateActor
        visible={showUpdateModal}
        onClose={hideUpdateModal}
        initialState={selectedProfile}
        onSuccess={handleOnActorUpdate}
      />
    </>
  );
}

const ActorProfile = ({ profile, onEditClick, onDeleteClick }) => {
  const [showOptions, setShowOptions] = useState(false);
  const acceptedNameLength = 15;

  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };

  const handleOnMouseLeave = () => {
    setShowOptions(false);
  };

  const getName = (name) => {
    if (name.length <= acceptedNameLength) return name;

    return name.substring(0, acceptedNameLength) + "..";
  };

  const { name, about = "", avatar } = profile;

  if (!profile) return null;

  return (
    <div className="bg-white shadow dark:shadow dark:bg-second rounded h-20 overflow-hidden">
      <div
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className="flex cursor-pointer relative"
      >
        <img
          src={avatar}
          alt={name}
          className="w-20 aspect-square object-cover"
        />

        <div className="px-2">
          <h1 className="text-xl text-main dark:text-main font-semibold whitespace-nowrap">
            {getName(name)}
          </h1>
          <p className="text-main dark:text-main opacity-70">
            {about.substring(0, 50)}
          </p>
        </div>
        <Options
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          visible={showOptions}
        />
      </div>
    </div>
  );
};
const Options = ({ visible, onDeleteClick, onEditClick }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-main bg-opacity-25 backdrop-blur-sm flex justify-center items-center space-x-5">
      <button
        onClick={onDeleteClick}
        className="p-2 rounded-full bg-white text-main hover:opacity-80 transition"
        type="button"
      >
        <i className="bi bi-trash3-fill"></i>
      </button>
      <button
        onClick={onEditClick}
        className="p-2 rounded-full bg-white text-main hover:opacity-80 transition"
        type="button"
      >
        <i className="bi bi-pen-fill"></i>
      </button>
    </div>
  );
};