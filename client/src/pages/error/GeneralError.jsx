import { useSelector } from "react-redux";

const GeneralError = () => {
  const { error } = useSelector((state) => state.auth);

  if (!error || typeof error !== "string") {
    return null;
  }

  return (
    <div className="mt-4 mb-4 border-l-4 border-red-500 bg-red-100 p-2 text-red-700">
      <p className="ml-2 text-sm">
        {error[0].toUpperCase() + error.slice(1)}. <span className="font-medium">Please try again.</span>
      </p>
    </div>
  );
};

export default GeneralError;
