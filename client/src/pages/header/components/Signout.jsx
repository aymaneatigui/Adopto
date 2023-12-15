import { useSelector } from "react-redux";
import useSignout from "../../../hooks/auth/useSignout.jsx";

const Signout = () => {
  const { signout } = useSignout();
  const { user } = useSelector((state) => state.auth);
  return (
    <div
      className="block cursor-pointer px-4 py-2 hover:bg-zinc-200 hover:bg-opacity-30"
      onClick={() => signout(user?.id)}
    >
      Sign out
    </div>
  );
};

export default Signout;
