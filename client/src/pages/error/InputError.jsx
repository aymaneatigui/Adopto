import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const InputError = ({ fieldName }) => {
  const { error } = useSelector((state) => state.auth);

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
