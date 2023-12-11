import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <Link
      className="border-md flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-solid border-slate-900 bg-slate-900 px-5 py-2 leading-tight text-slate-50 hover:bg-slate-800"
      to={"/signup"}
    >
      Sign Up
    </Link>
  );
};

export default Signup;
