import useAccounts from "../../../hooks/settings/useAccounts.jsx";
import ErrorAlert from "../../error/ErrorAlert.jsx";
import InputError from "../../error/InputError.jsx";

const Accounts = () => {
  const {
    profile,
    register,
    handleSubmit,
    usernameErrorMessage,
    // EmailErrorMessage,
    clearUsernameError,
    // clearEmailError,
    watch,
  } = useAccounts();

  const username = watch("username", "");
  const newUsername = username.toLowerCase().replace(" ", "");

  return (
    <>
      <div className="relative my-5 ml-60 mr-10 h-screen overflow-hidden rounded-3xl border border-gray-900/10 bg-zinc-50 lg:ml-44">
        <div className=" h-full w-full overflow-auto overflow-x-hidden bg-zinc-50 px-14 py-10 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full hover:scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 md:px-5 md:py-6 ">
          <form
            className="flex h-full flex-col justify-between"
            onSubmit={handleSubmit}
          >
            <div className="bg-zinc-1000 ">
              {/* ----------------Header : ------------*/}
              <div className="pb-8">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                  Account
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>

              {/* ----------------Username : ------------*/}

              <div className="my-4 flex w-full items-start md:flex-col">
                <label
                  htmlFor="username"
                  className="mb-2 w-2/4 text-sm font-medium leading-6 text-gray-900 md:w-full"
                >
                  Username
                  <p className="mr-8 mt-1 text-xs font-normal leading-6 text-gray-400 md:mr-2">
                    Changing your username will also change your profile Url.
                  </p>
                </label>
                <div className="mt-3 flex w-2/4 flex-col md:!w-full">
                  <div className="w-92 mb-1 flex rounded-md border border-gray-300 shadow-sm focus-within:border-gray-500">
                    <span className="flex items-center rounded-md bg-zinc-100 px-3 text-sm text-gray-500">
                      <span className="whitespace-nowrap">adopto.com /</span>
                    </span>
                    <input
                      value={newUsername}
                      id="username"
                      {...register("username", {
                        required: "username is required",
                        minLength: {
                          value: 4,
                          message:
                            "username must be at least 4 characters long",
                        },
                        maxLength: {
                          value: 20,
                          message:
                            "username must be at most 20 characters long",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9._]*$/,
                          message: "Special characters allowed are . and _",
                        },
                      })}
                      maxLength={18}
                      onFocus={clearUsernameError}
                      type="text"
                      placeholder={
                        profile?.username ? profile?.username : "username"
                      }
                      className="overflow-hidden  border-0 bg-transparent py-1.5 pl-3 text-base leading-6 text-gray-900 placeholder:text-sm placeholder:text-gray-400 focus:ring-0 "
                    />
                  </div>

                  <InputError
                    fieldName={"username"}
                    message={usernameErrorMessage}
                  />
                </div>
              </div>
              {/* ----------------Email : ------------*/}
              {/* <div className="flex w-full items-start md:flex-col">
                <label
                  htmlFor="email"
                  className="mb-2 w-2/4 text-sm font-medium leading-6 text-gray-900 md:w-full"
                >
                  Email
                  <p className="mr-8 mt-1 text-xs font-normal leading-6 text-gray-400 md:mr-2"></p>
                </label>
                <div className="flex w-2/4 flex-col md:!w-full">
                  <input
                    id="email"
                    {...register("email", {
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "this email address is invalid",
                      },
                    })}
                    onFocus={clearEmailError}
                    type="text"
                    placeholder={
                      profile?.email ? profile?.email : "exemple@gmail.com"
                    }
                    className="mb-1 mt-3  w-80 overflow-hidden rounded-md border border-gray-300 py-1.5 pl-3 text-base leading-6 text-gray-900 shadow-sm placeholder:text-sm placeholder:text-gray-400 focus-within:border-gray-500 focus:ring-0 md:!w-full lg:w-full  "
                  />
                  <InputError fieldName={"email"} message={EmailErrorMessage} />
                </div>
              </div> */}
            </div>

            <div className=" w-full border-t border-gray-900/10">
              <div className="flex items-center justify-between">
                <div className="mr-2">
                  <ErrorAlert />
                </div>
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
            </div>
          </form>
          {/* <div className="absolute bottom-0 right-0 h-10 w-full bg-gradient-to-t from-zinc-50 to-transparent "></div> */}
        </div>
      </div>
    </>
  );
};

export default Accounts;
