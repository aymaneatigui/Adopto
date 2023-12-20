import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider, useDispatch } from "react-redux";
import store from "./store";

import Header from "./pages/header/Header.jsx";

import Home from "./pages/Home";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Protected from "./Protected.jsx";
import NotFound from "./pages/NotFound.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import { useEffect } from "react";
import { refresh } from "./features/auth/authActions.jsx";

const App = () => {
  return (
    <div className=" flex h-screen w-full flex-col bg-zinc-100 font-inter ">
      <Provider store={store}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/settings/*"
              element={
                <Protected>
                  <Settings />
                </Protected>
              }
            />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <AppContent />
      </Provider>
    </div>
  );
};

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("expirationTime")) {
      const expirationTime = localStorage.getItem("expirationTime");
      const currentTime = Date.now();
      if (currentTime >= expirationTime) {
        dispatch(refresh());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default App;
