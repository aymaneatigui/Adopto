import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const InputError = ({ fieldName, message }) => {
  const { error } = useSelector((state) => state.auth);

  //check if an error in client side

  if (message) {
    // eslint-disable-next-line react/prop-types
    const err = Array(message)?.find((error) => error.field === fieldName);
    if (err) {
      return <span className="text-xs text-red-500">{err.message}</span>;
    }
  }

  //check if error in server side
  if (!error || typeof error === "string") {
    return null;
  }

  const err = error.find((error) => error.field === fieldName);

  if (!err) {
    return null;
  }

  return <span className="text-xs text-red-500">{err.message}</span>;
};

export default InputError;
