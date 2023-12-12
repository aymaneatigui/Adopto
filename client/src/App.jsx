import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Header from "./pages/header/Header.jsx";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Protected from "./Protected.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
  return (
    <div className=" flex h-screen w-full flex-col bg-slate-50 font-inter ">
      <Provider store={store}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings/:username" element={<Protected><Profile /></Protected>} />
            <Route path="/settings/:username" element={<Protected><Profile /></Protected>} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
