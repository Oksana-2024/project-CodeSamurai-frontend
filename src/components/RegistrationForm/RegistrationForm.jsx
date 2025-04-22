import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordStrengthBar from "react-password-strength-bar-with-style-item";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { registerThunk } from "../../redux/auth/operations.js";
import s from "./RegistrationForm.module.css";

import Logo from "../../components/Logo/Logo.jsx";
import { validationSchemaRegister } from "../../helpers/registrationSchema.js";

import Button from "../Button/Button.jsx";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { BiSolidUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { PiLockFill } from "react-icons/pi";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchemaRegister),
    mode: "onBlur",
  });

  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFilled, setIsPasswordFilled] = useState(false);
  const [isConfirmPasswordFilled, setIsConfirmPasswordFilled] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setIsPasswordFilled(value.length > 0);
    setPasswordValue(value);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setIsConfirmPasswordFilled(value.length > 0);
    setConfirmPasswordValue(value);
  };

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { confirmPassword: _, ...credentials } = data;
      await dispatch(registerThunk(credentials)).unwrap();
      navigate("/dashboard");
    } catch {
      setError("email", {
        type: "server",
        message: "This email is already registered.",
      });
    }
  };

  return (
    <div className={s.registerContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.registerLogo}>
          <Logo className={s.iconLogo} />
        </div>
        <div className={s.boxLabel}>
          {/* Username */}
          <label className={s.label}>
            <div className={s.inputContainerLogo}>
              <BiSolidUser size={24} className={s.icon} />
              <input
                type="text"
                placeholder="Name"
                className={s.regInput}
                {...register("username")}
              />
            </div>
            <div className={s.errorWrapper}>
              {errors.username && (
                <p className={s.error}>{errors.username.message}</p>
              )}
            </div>
          </label>

          {/* Email */}
          <label className={s.label}>
            <div className={s.inputContainerLogo}>
              <MdEmail size={24} className={s.icon} />
              <input
                type="email"
                placeholder="E-mail"
                className={s.regInput}
                {...register("email")}
              />
            </div>
            <div className={s.errorWrapper}>
              {errors.email && (
                <p className={s.error}>{errors.email.message}</p>
              )}
            </div>
          </label>

          {/* Password */}
          <label className={s.label}>
            <div className={s.inputContainerLogo}>
              <PiLockFill size={24} className={s.icon} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={s.regInput}
                {...register("password")}
                onChange={handlePasswordChange}
              />
              {isPasswordFilled && (
                <button
                  type="button"
                  className={s.togglePassButton}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <AiOutlineEye size={20} className={s.eyeIcon} />
                  ) : (
                    <AiOutlineEyeInvisible size={20} className={s.eyeIcon} />
                  )}
                </button>
              )}
            </div>
            <div className={s.errorWrapper}>
              {errors.password && (
                <p className={s.error}>{errors.password.message}</p>
              )}
            </div>
          </label>

          {/* Confirm Password */}
          <label className={s.label}>
            <div className={s.inputContainerLogo}>
              <PiLockFill size={24} className={s.icon} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className={s.regInput}
                {...register("confirmPassword")}
                onChange={handleConfirmPasswordChange}
                value={confirmPasswordValue}
              />
              {isConfirmPasswordFilled && (
                <button
                  type="button"
                  className={s.togglePassButton}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEye size={20} className={s.eyeIcon} />
                  ) : (
                    <AiOutlineEyeInvisible size={20} className={s.eyeIcon} />
                  )}
                </button>
              )}
            </div>
            <div className={s.errorWrapper}>
              {errors.confirmPassword && (
                <p className={s.error}>{errors.confirmPassword.message}</p>
              )}
            </div>
          </label>
        </div>

        {/* Password Strength Indicator */}
        <div className={s.passwordStrengthWrapper}>
          <PasswordStrengthBar
            className={s.bar}
            password={passwordValue}
            scoreWords={[]}
            shortScoreWord=""
            minLength={6}
          />
        </div>

        <Button
          type="submit"
          text="Register"
          className={s.button}
          disabled={isSubmitting}
        />
        <Link to="/login" className={s.link}>
          Log in
        </Link>
      </form>
    </div>
  );
};

export default RegistrationForm;
