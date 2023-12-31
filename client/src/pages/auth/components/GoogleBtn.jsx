import { useGoogleLogin } from "@react-oauth/google";
import { googleSigninAction } from "../../../features/auth/authActions.jsx";
import { useDispatch } from "react-redux";

function Google() {
  const dispatch = useDispatch();
  const googleSignin = useGoogleLogin({
    onSuccess: async (response) => {
      dispatch(googleSigninAction(response));
    },
    flow: "auth-code",
  });

  return (
    // <div
    //   onClick={() => googleSignin()}
    //   className="flex w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
    // >
    //   <img
    //     className="h-5 w-5"
    //     src="https://www.svgrepo.com/show/506498/google.svg"
    //     alt=""
    //   />
    // </div>
    <button
      onClick={() => googleSignin()}
      className="group h-10 w-full rounded-full border border-gray-300 px-6 transition duration-300 hover:border-gray-400 hover:bg-gray-50 focus:bg-gray-50 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-zinc-200 active:bg-gray-50"
    >
      <div className="relative flex items-center justify-center space-x-4">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-5"
          alt="google logo"
        />
        <span className="block  w-max text-sm font-medium tracking-wide text-gray-900 transition duration-300 group-hover:text-gray-900  xs:text-xs">
          Continue with Google
        </span>
      </div>
    </button>
  );
}

export default Google;
