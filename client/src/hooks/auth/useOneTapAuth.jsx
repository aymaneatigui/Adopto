import { useGoogleOneTapLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { googleSigninAction } from "../../features/auth/authActions.jsx";

export default function useOneTapAuth() {
  const dispatch = useDispatch();
  useGoogleOneTapLogin({
    onSuccess: async (response) => {
      const data = { code: response.credential, type: "onetape" };
      await dispatch(googleSigninAction(data));
    },
  });
}
