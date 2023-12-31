import useSignup from "../../hooks/auth/useSignup.jsx";
import GeneralError from "../error/GeneralError.jsx";
import InputError from "../error/InputError.jsx";
import BtnLoading from "./components/BtnLoading.jsx";
import Google from "./components/GoogleBtn.jsx";
import SignupBtn from "./components/SignupBtn.jsx";

const Signup = () => {
  const {
    register,
    handleSubmit,
    usernameError,
    passwordError,
    clearUsernameError,
    clearPasswordError,
    loading,
    usernameErrorMessage,
    passwordErrorMessage,
    watch,
  } = useSignup();

  const username = watch("username", "");
  const newUsername = username.toLowerCase();

  return (
    <>
      <section className="mx-auto flex w-full flex-grow items-center justify-center ">
        <div className="w-96 -translate-y-10 transform  p-7 sm:w-80">
          {/* <div className="mx-auto w-full"> */}
          {/* <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
          <h2 className="mt-4 text-center text-5xl font-bold leading-9 tracking-tight text-slate-900">
            Sign Up
          </h2>
          {/* </div> */}
          <form className="mt-14 w-full" onSubmit={handleSubmit}>
            <div className="relative mt-5">
              <input
                id="username"
                value={newUsername}
                type="text"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 4,
                    message: "username must be at least 4 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "username must be at most 20 characters long",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._]*$/,
                    message: "Special characters allowed are . and _",
                  },
                })}
                placeholder=""
                onFocus={clearUsernameError}
                className={`peer  mt-1 w-full border-0 border-b-2 border-gray-300  bg-transparent px-2 py-1 font-medium ring-0 placeholder:text-transparent focus:border-b-slate-700 focus:outline-none focus:ring-0 
                ${loading && "animate-pulse "}
                `}
                disabled={loading ? true : false}
              />
              <label
                htmlFor="username"
                className={`pointer-events-none absolute left-0 top-0 ml-2 origin-left -translate-y-1/2 transform text-xs  font-light leading-6 transition-all duration-200 ease-in-out focus:opacity-75  peer-placeholder-shown:top-1/2  peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:pl-0 peer-focus:text-xs  peer-focus:font-light
                ${
                  usernameError
                    ? "text-red-500 peer-placeholder-shown:text-red-500 peer-focus:text-red-500"
                    : "text-gray-500 peer-placeholder-shown:text-gray-900 peer-focus:text-gray-500 "
                }`}
              >
                Username :
              </label>
            </div>
            <InputError fieldName={"username"} message={usernameErrorMessage} />
            <div className="relative mt-5">
              <input
                id="password"
                type="password"
                placeholder=""
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be at most 20 characters long",
                  },
                  pattern: {
                    value: /^[A-Za-z0-9.@/_#%!$&*-]*$/,
                    message:
                      "Special characters allowed: . / @ _ # % ! $ & * -",
                  },
                })}
                onFocus={clearPasswordError}
                className={`peer mt-1 w-full border-0 border-b-2 border-gray-300  bg-transparent px-2 py-1 font-medium ring-0 placeholder:text-transparent focus:border-b-slate-700 focus:outline-none focus:ring-0 
                ${loading && "animate-pulse "}
                `}
                disabled={loading ? true : false}
              />
              <label
                htmlFor="password"
                className={`pointer-events-none absolute left-0 top-0 ml-2 origin-left -translate-y-1/2 transform text-xs  font-light leading-6 transition-all duration-200 ease-in-out focus:opacity-75  peer-placeholder-shown:top-1/2  peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:pl-0 peer-focus:text-xs  peer-focus:font-light
                ${
                  passwordError
                    ? "text-red-500 peer-placeholder-shown:text-red-500 peer-focus:text-red-500"
                    : "text-gray-500 peer-placeholder-shown:text-gray-900 peer-focus:text-gray-500 "
                }`}
              >
                Password :
              </label>
            </div>
            <InputError fieldName={"password"} message={passwordErrorMessage} />

            <GeneralError />

            <div className="mt-4 flex  justify-end">
              {loading ? <BtnLoading /> : <SignupBtn />}
            </div>
            <div className="mt-4 flex w-full justify-center"></div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex cursor-default justify-center text-sm">
                <span className="bg-zinc-100 px-2 text-gray-500 ">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 w-full">
              <Google />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
