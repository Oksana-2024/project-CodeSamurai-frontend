import React from "react";
import s from "./Avatar.module.css";
import { FaPlus } from "react-icons/fa";

const Avatar = ({ user, edit, onAvatarEdit }) => {
  return (
    <div className={s.avatarWrapper}>
      
        <div className={s.avatar} >
          {user?.photo ? (
            <img width={96} src={user.photo} className={s.photo} />
          ) : (
            user.name[0]
          )}
        </div>
        {edit && (
          <button className={s.addAvatar} type="button" onClick={onAvatarEdit}>
            <FaPlus size={10} />
          </button>
        )}
     
    </div>
  );
};

export default Avatar;
