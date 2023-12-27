import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../features/auth/authSlice.jsx";

const ErrorAlert = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth); // Get the error from the state
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearErrors());
      }, 15000); // Clear the error after 5 seconds

      return () => clearTimeout(timer); // Clear the timer if the component unmounts
    }
  }, [error, dispatch]);

  return (
    <>
      {error && (
        <div
            className=" rounded-md my-5 w-fit border-l-4 border-red-500 bg-red-100 py-2 px-4 text-sm text-red-700"
            role="alert"
          >
            <p className="font-bold">Be Warned</p>
            <p>{error}</p>
          </div>
      )}
    </>
  );
};

export default ErrorAlert;
