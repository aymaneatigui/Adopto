import { useGoogleLogin } from "@react-oauth/google";
import { googleSigninAction } from "../../../features/auth/authActions.jsx";
import { useDispatch } from "react-redux";

function Google() {
  const dispatch = useDispatch();
  const googleSignin = useGoogleLogin({
    onSuccess: async (response) => {
      console.log(response);
      dispatch(googleSigninAction(response));
    },
    flow: "auth-code",
  });

  return (
    <div
      onClick={() => googleSignin()}
      className="flex w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
    >
      <img
        className="h-5 w-5"
        src="https://www.svgrepo.com/show/506498/google.svg"
        alt=""
      />
    </div>
  );
}

export default Google;
