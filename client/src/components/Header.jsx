import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex h-14 w-full items-center justify-between px-12 pt-2  text-slate-900 ">
      <div className="font-inter text-2xl font-medium">
        <Link to={"/"}>Adopto</Link>
      </div>
      <nav className="flex items-center">
        <Link
          className="cursor-pointer px-3 py-1 hover:rounded-lg hover:bg-slate-200 hover:bg-opacity-30"
          to={"/aymane"}
        >
          Profile
        </Link>
        <div className="mx-4 h-5 w-[1px] bg-slate-900 opacity-20"></div>
        <div className="flex items-center">
          <Link
            className="mr-5 cursor-pointer whitespace-nowrap px-3 py-1 hover:rounded-lg hover:bg-slate-200 hover:bg-opacity-30"
            to={"/signin"}
          >
            Sign In
          </Link>
          <Link
            className="border-md flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-solid border-slate-900 bg-slate-900 px-5 py-2 leading-tight text-slate-50 hover:bg-slate-800"
            to={"/signup"}
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
