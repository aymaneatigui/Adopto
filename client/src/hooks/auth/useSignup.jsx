import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupAction } from "../../features/auth/authActions.jsx";
import { useEffect, useState } from "react";
import { clearErrors } from "../../features/auth/authSlice.jsx";

const useSignup = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { user, error, status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [usernameErrorMessage, setUsernameErrorMessage] = useState(undefined);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(undefined);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    dispatch(clearErrors());
  }, [dispatch, navigate, user]);

  useEffect(() => {
    if (error) {
      if (typeof error === "string") {
        setUsernameError(error.toLowerCase().includes("username"));
        setPasswordError(error.toLowerCase().includes("password"));
      } else {
        setUsernameError(error.some((err) => err.field === "username"));
        setPasswordError(error.some((err) => err.field === "password"));
      }
    } else {
      setUsernameError(false);
      setPasswordError(false);
    }
  }, [error]);

  const onSubmit = (credentials) => {
    dispatch(signupAction(credentials));
    setUsernameErrorMessage(undefined);
    setPasswordErrorMessage(undefined);
  };
  const onError = () => {
    if (errors) {
      setUsernameErrorMessage({
        message: errors?.username?.message,
        field: "username",
      });
      setPasswordErrorMessage({
        message: errors?.password?.message,
        field: "password",
      });
    }
  };

  const clearUsernameError = () => {
    setUsernameError(false);
  };

  const clearPasswordError = () => {
    setPasswordError(false);
  };

  const loading = status === "loading" ? true : false;

  return {
    register,
    handleSubmit: handleSubmit(onSubmit, onError),
    usernameError,
    passwordError,
    clearUsernameError,
    clearPasswordError,
    loading,
    usernameErrorMessage,
    passwordErrorMessage,
    watch,
  };
};

export default useSignup;
