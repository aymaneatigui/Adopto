import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();

  axios
    .post(
      "http://localhost:3001/auth/signin",
      {
        username: "aymane",
        password: "root",
      },
      { withCredentials: true },
    )
    .then((res) => console.log(res))
    .catch((error) => {
      console.error(error);
    });

  return <div>Profile of user: {username}</div>;
};

export default Profile;
