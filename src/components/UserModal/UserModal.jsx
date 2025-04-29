import { useDispatch, useSelector } from "react-redux";
import ModalWindow from "../ModalWindow/ModalWindow";
import { useForm } from "react-hook-form";
import s from "./UserModal.module.css";
import { setOpenUserProfile, useAuth } from "../../redux/auth/slice";
import { selectUserProfile } from "../../redux/auth/selectors";
import { useRef, useState } from "react";
import Button from "../Button/Button";
import Avatar from "../Avatar/Avatar";
import { updateUser } from "../../redux/auth/operations";

const UserModal = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const isUserOpen = useSelector(selectUserProfile);
  const inputAvatar = useRef(null);

  const [photo, setFile] = useState(null);
  const onSubmit = async (data) => {
    const form = new FormData();

    form.append("name", data.name);
    if (photo) {
      form.append("photo", photo);
    }
    dispatch(updateUser(form));
  };

  const handlePhotoChange = (event) => {
    setFile(event.target.files[0]);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
    },
  });

  return (
    <ModalWindow
      closeModal={() => dispatch(setOpenUserProfile(false))}
      modalIsOpen={isUserOpen}
      title="Edit Profile"
    >
      <div className={s.modalBox}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Avatar
            user={{
              photo: photo ? URL.createObjectURL(photo) : user.photo,
              name: user.name,
            }}
            edit={true}
            onAvatarEdit={() => inputAvatar.current.click()}
          ></Avatar>
          <input
            {...register("avatar")}
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={handlePhotoChange}
            ref={inputAvatar}
          />
          <div className={s.error}>
            {errors.name && <p>Last name is required.</p>}
          </div>
          <input
            placeholder="Name"
            type="text"
            {...register("name", { required: true })}
          />
          <div className={s.error}>
            {errors.name && <p>Last name is required.</p>}
          </div>
          <Button text="save" />
        </form>
      </div>
    </ModalWindow>
  );
};

export default UserModal;
