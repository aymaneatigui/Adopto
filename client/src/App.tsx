import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/Header";

import Home from "./views/Home";
import Profile from "./views/Profile";
import Signin from "./views/auth/Signin";
import Signup from "./views/auth/Signup";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/:username" Component={Profile}/>
          <Route path="/signin" Component={Signin} />
          <Route path="/signup" Component={Signup} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
