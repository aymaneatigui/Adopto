// import { ProfilePictureIcon } from "../../../Icons/Icons.jsx";

import { useState } from "react";
import { CameraIcon, ProfilePictureIcon } from "../../../Icons/Icons.jsx";
import { useSelector } from "react-redux";
import useProfile from "../../../hooks/settings/useProfile.jsx";
import InputError from "../../error/InputError.jsx";
import Modalimg from "./Components/modalimg.jsx";

const Profile = () => {
  const { profileImg } = useSelector((state) => state.profile);
  const [imgError, setImgError] = useState(false);

  const [isModalimgOpen, setModalimgOpen] = useState(false);

  const toggleModalimg = () => {
    setModalimgOpen(!isModalimgOpen);
  };

  const handleError = () => {
    setImgError(true);
  };

  const {
    profile,
    register,
    handleSubmit,
    clearFnameError,
    clearLnameError,
    clearBioError,
    fnameErrorMessage,
    lnameErrorMessage,
    bioErrorMessage,
  } = useProfile();

  return (
    <>
      <div className="relative my-5 ml-60 mr-10 h-screen overflow-hidden rounded-3xl border border-gray-900/10 bg-zinc-50 lg:ml-44">
        <div className=" h-full w-full overflow-auto overflow-x-hidden bg-zinc-50 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full hover:scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 ">
          <form
            className="flex h-full flex-col justify-between"
            onSubmit={handleSubmit}
          >
            <div>
              {/*---------- Cover Picture ----------*/}
              <div
                className={`flex h-40 w-full items-end justify-end bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black`}
              >
                <div className="m-5 flex cursor-pointer items-center justify-center rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-slate-100 hover:bg-slate-800">
                  <div className="mb-1 mr-2 h-5 w-5">
                    <CameraIcon />
                  </div>
                  <span className="md:hidden">Update Cover</span>
                </div>
              </div>
              {/*---------- Profile Picture ----------*/}
              <div className="z-10 -mt-20 flex w-full justify-center">
                <div
                  className={`relative flex h-28 w-28 select-none items-center justify-center rounded-full bg-slate-900 object-cover`}
                  onClick={toggleModalimg}
                >
                  <Modalimg isOpen={isModalimgOpen} onClose={toggleModalimg} />
                  {profileImg && !imgError ? (
                    <img
                      src={profileImg}
                      alt="profile"
                      className="h-full w-full rounded-full object-cover"
                      onError={handleError}
                    />
                  ) : (
                    <div className="h-full w-full">
                      <ProfilePictureIcon />
                    </div>
                  )}
                  <div className="group absolute z-20 flex h-full w-full cursor-pointer items-center justify-center rounded-full transition hover:bg-[#4b4c4fbb]">
                    <div className="flex h-7 w-7 items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <CameraIcon />
                    </div>
                  </div>
                </div>
              </div>
              {/* ---------- Personale Information: ---------- */}
              <div className="mt-10 grid w-full grid-cols-2 justify-between px-5 lg:grid-cols-1">
                {/* Name */}
                <div className="mb-5 flex w-full justify-evenly md:flex-col md:items-center">
                  <div className="mx-5 flex flex-col">
                    <label
                      htmlFor="fname"
                      className="mb-1 mt-4 text-sm font-medium leading-6 text-gray-900"
                    >
                      First Name :
                    </label>
                    <input
                      type="text"
                      placeholder={profile?.fname ? profile?.fname : ""}
                      className=" mb-1 w-full overflow-hidden rounded-md border border-gray-300 py-1.5 pl-3 text-base leading-6 text-gray-900 shadow-sm placeholder:text-sm placeholder:text-gray-400 focus-within:border-gray-500 focus:ring-0"
                      {...register("fname", {
                        pattern: {
                          value: /^[A-Za-zéèçà]*$/,
                          message: "only letters are allowed",
                        },
                      })}
                      onFocus={clearFnameError}
                    />
                    <InputError
                      fieldName={"fname"}
                      message={fnameErrorMessage}
                    />
                  </div>
                  <div className="mx-5 flex flex-col">
                    <label
                      htmlFor="lname"
                      className="mb-1 mt-4 text-sm font-medium leading-6 text-gray-900"
                    >
                      Last Name :
                    </label>
                    <input
                      type="text"
                      placeholder={profile?.lname ? profile?.lname : ""}
                      className=" mb-1 w-full overflow-hidden rounded-md border border-gray-300 py-1.5 pl-3 text-base leading-6 text-gray-900 shadow-sm placeholder:text-sm placeholder:text-gray-400 focus-within:border-gray-500 focus:ring-0"
                      {...register("lname", {
                        pattern: {
                          value: /^[A-Za-zéèçà]*$/,
                          message: "only letters are allowed",
                        },
                      })}
                      onFocus={clearLnameError}
                    />
                    <InputError
                      fieldName={"lname"}
                      message={lnameErrorMessage}
                    />
                  </div>
                </div>
                {/*---------- Bio ---------- */}
                <div className=" flex flex-col items-center justify-center ">
                  <div className="flex flex-col">
                    <label
                      htmlFor="bio"
                      className="mb-1 mt-4 whitespace-nowrap text-sm font-medium leading-6 text-gray-900"
                    >
                      Bio :
                    </label>

                    <textarea
                      className="w-80 max-w-xs overflow-hidden rounded-md border border-gray-300 py-1.5 pl-3 text-base leading-6 text-gray-900 shadow-sm placeholder:text-sm placeholder:text-gray-400 focus-within:border-gray-500 focus:ring-0 md:w-52"
                      rows="4"
                      placeholder={
                        profile?.bio
                          ? profile?.bio
                          : "Enter any additional order notes..."
                      }
                      {...register("bio", {
                        pattern: {
                          value: /^[A-Za-z0-9.@/_#%!$&*-\séèçà"'']*$/,
                          message:
                            "Special characters allowed: . / @ _ # % ! $ & * - ' \" ",
                        },
                      })}
                      onFocus={clearBioError}
                    ></textarea>
                    <InputError fieldName={"bio"} message={bioErrorMessage} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-5 mt-5 border-t border-gray-900/10 pb-5">
              <div className="flex items-center justify-end gap-x-3 pt-4">
                <button
                  type="button"
                  className="flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full  px-5 py-2 text-sm leading-tight hover:bg-zinc-200 hover:bg-opacity-30 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-zinc-200 "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border-md flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-solid border-slate-900 bg-slate-900 px-5 py-2 text-sm leading-tight text-slate-50 hover:bg-slate-800"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
