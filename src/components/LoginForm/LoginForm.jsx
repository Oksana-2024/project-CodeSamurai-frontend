import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { loginThunk } from "../../redux/auth/operations.js";
import s from "./LoginForm.module.css";

import Logo from "../../components/Logo/Logo.jsx";
import { validationSchemaLogin } from "../../helpers/loginSchema.js";

import Button from "../Button/Button.jsx";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { MdEmail } from "react-icons/md";
import { PiLockFill } from "react-icons/pi";

import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchemaLogin),
    mode: "onBlur",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFilled, setIsPasswordFilled] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setIsPasswordFilled(value.length > 0);
  };

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await dispatch(loginThunk(data)).unwrap();
      navigate("/dashboard");
    } catch (error) {}
  };

  return (
    <div className={s.loginContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.loginForm}>
        <div className={s.loginLogo}>
          <Logo className={s.iconLogo} />
        </div>
        <div className={s.loginBoxLabel}>
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
        </div>
        <Button
          type="submit"
          text="Log in"
          className={s.button}
          disabled={isSubmitting}
        />
        <Link to="/register" className={s.link}>
          Register
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
