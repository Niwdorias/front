import React from "react";
import ModalContainer from "./ModalContainer";

export default function WritersModal({
  profiles = [],
  visible,
  onClose,
  onRemoveClick,
}) {
  return (
    <ModalContainer ignoreContainer onClose={onClose} visible={visible}>
      <div className="space-y-2 dark:bg-primary bg-white rounded max-w-[45rem] max-h-[40rem] overflow-auto p-2 custom-scroll-bar">
        {profiles.map(({ id, name, avatar }) => {
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
              <p className="w-full font-semibold dark:text-white text-main">
                {name}
              </p>
              <button
                onClick={() => onRemoveClick(id)}
                className="dark:text-white text-main hover:opacity-80 transition p-2"
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
}
