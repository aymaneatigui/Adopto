import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../features/profile/profileActions.jsx";
import { useState } from "react";

const useProfile = () => {
  const { profile } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [fnameErrorMessage, setFnameErrorMessage] = useState(undefined);
  const [lnameErrorMessage, setLnameErrorMessage] = useState(undefined);
  const [bioErrorMessage, setBioErrorMessage] = useState(undefined);

  const onSubmit = (obj) => {
    const data = Object.fromEntries(
      Object.entries(obj).filter(([, value]) => value !== ""),
    );
    console.log(data)
    dispatch(updateProfile(data));
    reset();
  };

  const onError = () => {
    if (errors) {
      setFnameErrorMessage({
        message: errors?.fname?.message,
        field: "fname",
      });
      setLnameErrorMessage({
        message: errors?.lname?.message,
        field: "lname",
      });
      setBioErrorMessage({
        message: errors?.bio?.message,
        field: "bio",
      });
    }
  };

  const clearFnameError = () => {
    setFnameErrorMessage(undefined);
  };

  const clearLnameError = () => {
    setLnameErrorMessage(undefined);
  };
  const clearBioError = () => {
    setBioErrorMessage(undefined);
  };


  return {
    profile,
    register,
    handleSubmit: handleSubmit(onSubmit, onError),
    clearFnameError,
    clearLnameError,
    clearBioError,
    fnameErrorMessage,
    lnameErrorMessage,
    bioErrorMessage
  };
};

export default useProfile;
