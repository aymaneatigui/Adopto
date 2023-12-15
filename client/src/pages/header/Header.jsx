import { Link } from "react-router-dom";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import { useSelector } from "react-redux";
import Dropdown from "./components/Dropdown.jsx";
const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="z-10 flex h-14 w-full items-center justify-between px-12  pt-2 text-slate-900">
      <div className="font-inter text-2xl font-medium">
        <Link to={"/"}>Adopto</Link>
      </div>
      <nav className="flex items-center">
        {/* <Link
          className="cursor-pointer px-3 py-1 hover:rounded-lg hover:bg-slate-200 hover:bg-opacity-30"
          to={"/settings/profile"}
        >
          Profile
        </Link> */}
        {user ? (
          <>
            {/* <div className="mx-4 h-5 w-[1px] bg-slate-900 opacity-20"></div>
            <Singout /> */}
            <div className="mx-2 h-5 w-[1px] bg-slate-900 opacity-20"></div>
            <Dropdown />
          </>
        ) : (
          <>
            <div className="mx-3 h-5 w-[1px] bg-slate-900 opacity-20"></div>
            <Signin />
            <Signup />
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
