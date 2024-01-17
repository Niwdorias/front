import React from "react";
import ModalContainer from "./ModalContainer";

export default function CastModal({
  casts = [],
  visible,
  onClose,
  onRemoveClick,
}) {
  return (
    <ModalContainer ignoreContainer onClose={onClose} visible={visible}>
      <div className="space-y-2 dark:bg-main bg-white rounded max-w-[45rem] max-h-[40rem] overflow-auto p-2 custom-scroll-bar">
        {casts.map(({ profile, roleAs, leadActor }) => {
          const { name, avatar, id } = profile;
          return (
            <div
              key={id}
              className="flex space-x-3 dark:bg-second bg-white drop-shadow-md rounded"
            >
              <img
                className="w-16 h-16 aspect-square rounded object-cover"
                src={avatar}
                alt={name}
              />
              <div className="w-full flex flex-col justify-between">
                <div>
                  <p className="font-semibold dark:text-white text-main">
                    {name}
                  </p>
                  <p className="text-sm dark:text-dark-subtle text-light-subtle">
                    {roleAs}
                  </p>
                </div>
                {leadActor && <i className="bi bi-bag-check"></i>}
              </div>
              <button
                onClick={() => onRemoveClick(id)}
                className="dark:text-white text-main hover:opacity-80 transition p-2"
              >
                <i className="bi bi-x-circle-fill"></i>
              </button>
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
}
