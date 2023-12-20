import { useState, } from "react";
import { signinAction } from "../features/auth/authActions.jsx";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const { status, error, user } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      username,
      password,
    };
    dispatch(signinAction(credentials));
  };
  return (
    <>
      <div>Profile of user: {username}</div>
      {user ? (
        <div>
          <h1>username : {user.username}</h1>
          <h2>id : {user.id}</h2>
        </div>
      ) : status === "loading" ? (
        "🌀"
      ) : (
        <form onSubmit={handleSubmit}>
          {Array.isArray(error) && error.length > 0 && (
            <div className='error-container'>
              {error.map((e, id) => (
                <h2 key={id} className='text-xl text-red-600'>
                  {e.message}
                </h2>
              ))}
            </div>
          )}
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              className='form-input'
              autoComplete='false'
              id='username'
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              autoComplete='false'
              className='form-input'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='button'>
            Sign-in
          </button>
        </form>
      )}
    </>
  );
};
export default Profile;
