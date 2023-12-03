import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/Header";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signupp";

const App = () => {
  return (
    <div className=" flex flex-col h-screen w-full bg-slate-50 font-inter ">
      <Provider store={store}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/:username" Component={Profile} />
            <Route path="/signin" Component={Signin} />
            <Route path="/signup" Component={Signup} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
