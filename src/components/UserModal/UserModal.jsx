import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalWindow from "../ModalWindow/ModalWindow";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./UserModal.module.css";
import { setOpenUserProfile, useAuth } from "../../redux/auth/slice";
import { selectUserProfile } from "../../redux/auth/selectors";
import Button from "../Button/Button";
import Avatar from "../Avatar/Avatar";
import { updateUser } from "../../redux/auth/operations";
import { validationSchemaUserUpdate } from "../../helpers/userSchema";
import useMedia from "../../helpers/useMedia";

const UserModal = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const isUserOpen = useSelector(selectUserProfile);
  const inputAvatar = useRef(null);
  const { isMobile } = useMedia;

  const [photo, setFile] = useState(null);
  const onSubmit = async (data) => {
    const form = new FormData();

    form.append("name", data.name);
    if (photo) {
      form.append("photo", photo);
    }
    await dispatch(updateUser(form))
      .unwrap()
      .then(() => dispatch(setOpenUserProfile(false)));
  };

  const handlePhotoChange = (event) => {
    setFile(event.target.files[0]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: user.name,
    },
    resolver: yupResolver(validationSchemaUserUpdate),
  });

  return (
    <ModalWindow
      closeModal={() => dispatch(setOpenUserProfile(false))}
      modalIsOpen={isUserOpen}
      title="Edit Profile"
      showIcon={isMobile ? false : true}
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
            className={s.file}
          />
          <input
            className={`${s.textEdit} ${errors.name && s.invalid}`}
            placeholder="Name"
            type="text"
            {...register("name", { required: true })}
          />

          <div className={s.error}>
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <Button text="save" className={s.save} />
        </form>
      </div>
    </ModalWindow>
  );
};

export default UserModal;
