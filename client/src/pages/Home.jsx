import { useSelector } from "react-redux";

const Home = () => {
  const { status } = useSelector((state) => state.auth);
  const loading = status === "loading" ? true : false;
  return <>{loading ? <div>Loading...</div> : <div>Home</div>}</>;
};

export default Home;
