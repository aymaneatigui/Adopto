import useSignin from "../../hooks/auth/useSignin.jsx";
import InputError from "../error/InputError.jsx";
import GeneralError from "../error/GeneralError.jsx";
import BtnLoading from "./components/BtnLoading.jsx";
import SigninBtn from "./components/SigninBtn.jsx";

const Signin = () => {
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
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
          <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-slate-900">
            Sign in to your account
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
                  {...register("username")}
                  autoComplete="username"
                  placeholder="Enter your username"
                  className={`block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset  placeholder:text-sm placeholder:text-slate-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6
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
                  placeholder="Enter your password"
                  {...register("password")}
                  autoComplete="current-password"
                  className={`block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset placeholder:text-sm placeholder:text-slate-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6
                  ${passwordError ? "ring-red-500" : "ring-slate-300"}`}
                  onFocus={clearPasswordError}
                />
                <InputError fieldName={"password"} />
              </div>

              <div className="mt-2 text-left text-sm">
                <a
                  href="#"
                  className="text-sm font-light text-slate-700 hover:text-slate-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <GeneralError />
            <div className="flex justify-end">
              {loading ? <BtnLoading /> : <SigninBtn />}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signin;
