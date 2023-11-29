import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to={"/"}>Home</Link>
      <span> | </span>
      <Link to={"/signin"}>Signin</Link>
      <span> | </span>
      <Link to={"/signup"}>Signup</Link>
      <span> | </span>
      <Link to={"/aymane"}>Profile</Link>
    </header>
  );
};

export default Header;
