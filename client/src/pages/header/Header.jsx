import { Link } from "react-router-dom";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "./components/Dropdown.jsx";
import { useEffect } from "react";
import { setprofileImg } from "../../features/profile/profileSlice.jsx";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    let blobUrl;
    const loadImage = async () => {
      if (profile?.picture) {
        // Convert the Base64 string to a Blob
        const response = await fetch(profile?.picture);
        const blob = await response.blob();
        blobUrl = URL.createObjectURL(blob);
        dispatch(setprofileImg(blobUrl));
      }
    };

    loadImage();
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [dispatch, profile]);

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
