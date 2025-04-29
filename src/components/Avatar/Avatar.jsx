import React from "react";
import s from "./Avatar.module.css";

const Avatar = ({ onClick, user, edit, onAvatarEdit }) => {
  return (
    <div>
      <button type="button" className={s.avatar} onClick={onClick}>
        {user?.photo ? (
          <img width={68} height={68} src={user.photo} />
        ) : (
          user.name[0]
        )}
      </button>
      {edit && (
        <button type="button" onClick={onAvatarEdit}>
          +
        </button>
      )}
    </div>
  );
};

export default Avatar;
