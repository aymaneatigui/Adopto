import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount } from "../../features/auth/authActions.jsx";

const useAccounts = () => {
  const { profile } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

  const [usernameErrorMessage, setUsernameErrorMessage] = useState(undefined);
  const [EmailErrorMessage, setEmailErrorMessage] = useState(undefined);

  const onSubmit = (obj) => {
    const data = Object.fromEntries(
      Object.entries(obj).filter(([, value]) => value !== ""),
    );
    dispatch(updateAccount(data));
    setUsernameErrorMessage(undefined);
    setEmailErrorMessage(undefined);
    reset();
  };

  const onError = () => {
    if (errors) {
      setUsernameErrorMessage({
        message: errors?.username?.message,
        field: "username",
      });
      setEmailErrorMessage({
        message: errors?.email?.message,
        field: "email",
      });
    }
  };

  const clearUsernameError = () => {
    setUsernameErrorMessage(undefined);
  };

  const clearEmailError = () => {
    setEmailErrorMessage(undefined);
  };

  return {
    profile,
    register,
    handleSubmit: handleSubmit(onSubmit, onError),
    usernameErrorMessage,
    EmailErrorMessage,
    clearEmailError,
    clearUsernameError,
    watch,
  };
};

export default useAccounts;
