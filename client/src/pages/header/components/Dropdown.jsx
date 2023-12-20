import { useEffect, useRef, useState } from "react";
import Signout from "./Signout.jsx";
import {
  AccountIcon,
  ProfilePictureIcon,
  SettingsIcon,
} from "../Icons/Icons.jsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { profile, profileImg } = useSelector((state) => state.profile);
  const node = useRef();
  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    setImgError(true);
  };

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={node} className="relative">
      <div
        className="block shrink-0 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {profileImg && !imgError ? (
          <img
            src={profileImg}
            alt="profile"
            className="h-9 w-9 rounded-full object-cover"
            onError={handleError}
          />
        ) : (
          <ProfilePictureIcon />
        )}
      </div>
      {isOpen && (
        <div className="absolute   -right-7 top-10 z-10 w-44 divide-y-reverse rounded-lg border border-slate-300 bg-gray-50  shadow-lg ">
          <ul className="py-2 text-sm text-slate-900">
            <li>
              <div className="px-4 py-3 text-center text-sm text-gray-900 ">
                {profile?.fname && profile?.lname && (
                  <div className="mb-1 truncate text-base font-medium">
                    {profile?.fname} {profile?.lname}
                  </div>
                )}
                <div className="truncate text-[13px]">@{profile?.username}</div>
              </div>
            </li>

            <li>
              <Link
                className="text-sm text-gray-900 "
                to={"/settings/profile"}
                onClick={() => setIsOpen(false)}
              >
                <div className="block cursor-pointer px-4 py-2 hover:bg-zinc-200 hover:bg-opacity-30 ">
                  <div className="flex items-center gap-2">
                    <AccountIcon />
                    Profile
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link
                className="text-sm text-gray-900 "
                to={"/settings"}
                onClick={() => setIsOpen(false)}
              >
                <div className="block cursor-pointer px-4 py-2 hover:bg-zinc-200 hover:bg-opacity-30">
                  <div className="flex items-center gap-2">
                    <SettingsIcon />
                    Settings
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <div className="mx-auto mt-3 h-[1px] w-36 bg-zinc-300"></div>
            </li>
            <li>
              <div className="items-center py-2">
                <Signout />
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
