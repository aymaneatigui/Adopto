import useSignup from "../../hooks/auth/useSignup.jsx";
import GeneralError from "../error/GeneralError.jsx";
import InputError from "../error/InputError.jsx";
import BtnLoading from "./components/BtnLoading.jsx";

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
          <h2 className=" text-center text-3xl font-bold leading-9 tracking-tight text-slate-900">
            Create your account
          </h2>
          {/* </div> */}
          <form className="mt-5 w-full" onSubmit={handleSubmit}>
            <div>
              <div className="mt-2">
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
            </div>

            <div>
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
              </div>
            </div>
            <GeneralError />

            <div className="mt-4 flex  justify-end">
              {loading ? (
                <>
                  <BtnLoading />
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className="me-2 flex w-auto items-center justify-center whitespace-nowrap rounded-full border border-slate-300 px-5 py-1.5 text-sm font-medium leading-6 text-slate-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Sign up
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      id="user-plus"
                      className="ml-2 h-4"
                    >
                      <line
                        x1="176"
                        x2="224"
                        y1="56"
                        y2="56"
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="19"
                      ></line>
                      <line
                        x1="200"
                        x2="200"
                        y1="32"
                        y2="80"
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="19"
                      ></line>
                      <path
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="19"
                        d="M30.989 215.99064a112.03731 112.03731 0 0 1 194.02311.002M188.05124 118.18275a63.96647 63.96647 0 1 1-45.27249-84.46794"
                      ></path>
                    </svg>
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
