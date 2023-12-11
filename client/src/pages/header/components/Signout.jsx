import { useSelector } from "react-redux";
import useSignout from "../../../hooks/auth/useSignout.jsx";

const Signout = () => {
  const { signout } = useSignout();
  const { user } = useSelector((state) => state.auth);
  return (
    <div
      className="cursor-pointer px-3 py-1 hover:rounded-lg hover:bg-slate-200 hover:bg-opacity-30"
      onClick={() => signout(user?.id)}
    >
      Sign out
    </div>
  );
};

export default Signout;
