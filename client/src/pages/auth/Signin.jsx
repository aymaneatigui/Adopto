import useSignin from "../../hooks/auth/useSignin.jsx";
import InputError from "../error/InputError.jsx";
import GeneralError from "../error/GeneralError.jsx";
import BtnLoading from "./components/BtnLoading.jsx";
import SigninBtn from "./components/SigninBtn.jsx";
import Google from "./components/Google.jsx";
import useOneTapAuth from "../../hooks/auth/useOneTapAuth.jsx";

const Signin = () => {
  useOneTapAuth();

  const {
    register,
    handleSubmit,
    usernameError,
    passwordError,
    clearUsernameError,
    clearPasswordError,
    loading,
  } = useSignin();

  return (
    <>
      <section className="t-[-70px] flex w-full flex-grow items-center justify-center">
        <div className="w-96 -translate-y-10 transform bg-slate-50 p-7 sm:w-80">
          {/* <div className="mx-auto w-full">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/image/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
          <h2 className=" mt-4 text-center text-5xl font-bold leading-9 tracking-tight text-gray-900">
            Sign In
          </h2>
          {/* </div> */}
          <form className="mt-14 w-full" onSubmit={handleSubmit}>
            {/* <div className="mt-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  autoComplete="username"
                  placeholder="Enter your username"
                  className={`block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset  placeholder:text-sm placeholder:text-slate-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6
                  ${usernameError ? "ring-red-500" : "ring-slate-300"}`}
                  onFocus={clearUsernameError}
                />
                <InputError fieldName={"username"} />
              </div> */}
            {/* <div className="mt-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                autoComplete="current-password"
                className={`block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset placeholder:text-sm placeholder:text-slate-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6
                  ${passwordError ? "ring-red-500" : "ring-slate-300"}`}
                onFocus={clearPasswordError}
              />
              <InputError fieldName={"password"} />
            </div> */}
            <div className="relative mt-5">
              <input
                id="username"
                type="text"
                {...register("username")}
                placeholder="Enter your username"
                onFocus={clearUsernameError}
                className={`peer mt-1 w-full border-0 border-b-2  bg-transparent px-2 py-1 font-medium ring-0 placeholder:text-transparent focus:border-b-slate-700 focus:outline-none focus:ring-0 
                ${usernameError ? "border-red-500" : "border-slate-300 "}`}
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
            <InputError fieldName={"username"} />
            <div className="relative mt-5">
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                onFocus={clearPasswordError}
                className={`peer mt-1 w-full border-0 border-b-2  bg-transparent px-2 py-1 font-medium ring-0 placeholder:text-transparent focus:border-b-slate-700 focus:outline-none focus:ring-0 
                ${passwordError ? "border-red-500" : "border-slate-300"}`}
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
            <InputError fieldName={"password"} />
            <div className=" mt-4 text-left text-sm">
              <a
                href="#"
                className="px-3 py-1 text-sm font-light text-gray-500 hover:rounded-lg hover:bg-slate-200 hover:bg-opacity-30"
              >
                Forgot password?
              </a>
            </div>
            <GeneralError />
            <div className="flex justify-end">
              {loading ? <BtnLoading /> : <SigninBtn />}
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex cursor-default justify-center text-sm">
                <span className="bg-slate-50 px-2 text-gray-500 ">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              {/* <div>
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  <img
                    className="h-5 w-5"
                    src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                    alt=""
                  />
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  <img
                    className="h-5 w-5"
                    src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                    alt=""
                  />
                </a>
              </div> */}
              {/* <div>
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  <img
                    className="h-5 w-5"
                    src="https://www.svgrepo.com/show/506498/google.svg"
                    alt=""
                  />
                </a>
              </div> */}
              <Google />
              <Google />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
