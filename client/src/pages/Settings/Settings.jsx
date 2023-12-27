import { Navigate, Route, Routes } from "react-router-dom";
import SideBar from "./SideBar.jsx";
import Accounts from "./settingsPages/Accounts.jsx";
import NotFound from "../NotFound.jsx";
// import Profile from "../Profile.jsx";
import Profile from "./settingsPages/Profile.jsx";

const Settings = () => {
  return (
    <>
      <SideBar />
      <Routes>
        <Route path="/" element={<Navigate to="account" replace/>} />
        <Route path="/profile/" element={<Profile />} />
        <Route path="/account/" element={<Accounts />} />
        <Route path="/support/" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Settings;
