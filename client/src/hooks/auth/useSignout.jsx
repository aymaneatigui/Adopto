import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signoutAction } from "../../features/auth/authActions.jsx";

const useSignout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signout = async (id) =>{
    await dispatch(signoutAction({ accountId: id }));
    navigate("/signin");
  };

  return { signout };
};

export default useSignout;
