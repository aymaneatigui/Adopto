import axios from "axios";

const Home = () => {
  axios
    .get("http://localhost:3001", { withCredentials: true })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  return <div>Home</div>;
};

export default Home;
