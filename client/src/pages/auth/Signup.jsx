import useSignup from "../../hooks/auth/useSignup.jsx";
import GeneralError from "../error/GeneralError.jsx";
import InputError from "../error/InputError.jsx";
import BtnLoading from "./components/BtnLoading.jsx";
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
  } = useSignup();

  return (
    <>
      <section className="mx-auto flex w-full flex-grow items-center justify-center ">
        <div className="w-96 -translate-y-10 transform bg-slate-50 p-7 sm:w-80">
          {/* <div className="mx-auto w-full"> */}
          {/* <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
          <h2 className=" text-center text-5xl font-bold leading-9 tracking-tight text-slate-900">
            Sign Up
          </h2>
          {/* </div> */}
          <form className="mt-5 w-full" onSubmit={handleSubmit}>
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
                  placeholder="Enter your username"
                  autoComplete="username"
                  {...register("username")}
                  className={`block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset placeholder:text-sm placeholder:text-slate-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6
                  ${usernameError ? "ring-red-500" : "ring-slate-300"}`}
                  onFocus={clearUsernameError}
                />
                <InputError fieldName={"username"} />
              </div>

              <div className="mt-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={`block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset  placeholder:text-sm placeholder:text-slate-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6
                  ${passwordError ? "ring-red-500" : "ring-slate-300"}`}
                  onFocus={clearPasswordError}
                />
                <InputError fieldName={"password"} />
            </div> */}

            <div className="relative mt-12">
              <input
                id="username"
                type="text"
                {...register("username")}
                placeholder="Enter your username"
                onFocus={clearUsernameError}
                className={`peer mt-1 w-full border-0 border-b-2  bg-transparent px-4 py-1 font-medium ring-0 placeholder:text-transparent focus:border-b-slate-700 focus:outline-none focus:ring-0 
                ${usernameError ? "border-red-500" : "border-slate-300 "}`}
              />
              <label
                htmlFor="username"
                className={`pointer-events-none absolute left-0 top-0 ml-1 origin-left -translate-y-1/2 transform text-sm font-medium  leading-6 transition-all duration-300 ease-in-out focus:opacity-75 peer-placeholder-shown:top-1/2  peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm
                ${
                  usernameError
                    ? "text-red-500 peer-placeholder-shown:text-red-500 peer-focus:text-red-500"
                    : "text-slate-500 peer-placeholder-shown:text-slate-900 peer-focus:text-slate-500 "
                }`}
              >
                Username
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
                className={`peer mt-1 w-full border-0 border-b-2  bg-transparent px-5 py-1 font-medium ring-0 placeholder:text-transparent focus:border-b-slate-700 focus:outline-none focus:ring-0
                ${passwordError ? "border-red-500" : "border-slate-300"}`}
              />
              <label
                htmlFor="password"
                className={`pointer-events-none absolute left-0 top-0 ml-1 origin-left -translate-y-1/2 transform text-sm font-medium  leading-6 transition-all duration-300 ease-in-out focus:opacity-75 peer-placeholder-shown:top-1/2  peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm
                ${
                  passwordError
                    ? "text-red-500 peer-placeholder-shown:text-red-500 peer-focus:text-red-500"
                    : "text-slate-500 peer-placeholder-shown:text-slate-900 peer-focus:text-slate-500 "
                }`}
              >
                Password
              </label>
            </div>
            <InputError fieldName={"password"} />

            <GeneralError />

            <div className="mt-4 flex  justify-end">
              {loading ? <BtnLoading /> : <SignupBtn />}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
