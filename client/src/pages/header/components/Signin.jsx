import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <Link
      className="mr-3 flex cursor-pointer items-center justify-center whitespace-nowrap  rounded-full px-5 py-2 leading-tight hover:bg-zinc-200 hover:bg-opacity-30 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-zinc-200 "
      to={"/signin"}
    >
      Sign In
    </Link>
  );
};

export default Signin;
