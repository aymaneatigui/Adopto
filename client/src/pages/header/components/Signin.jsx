import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <Link
      className="mr-5 cursor-pointer whitespace-nowrap px-3 py-1 hover:rounded-lg hover:bg-slate-200 hover:bg-opacity-30"
      to={"/signin"}
    >
      Sign In
      
    </Link>
  );
};

export default Signin;
