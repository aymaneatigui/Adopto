import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const SideBar = () => {
  let param = useParams();
  let params = param["*"];
  return (
    <aside className="fixed inset-0 z-10 mb-4 ml-10 mt-20 flex h-[calc(100vh-100px)] w-44 flex-col bg-transparent py-3 pl-5 text-slate-900">
      <Link
        to={"profile"}
        className={`my-3 h-fit w-fit cursor-pointer px-4 transition hover:border-l-2  hover:border-gray-300 hover:font-medium
        ${params == "profile" && "border-l-2 border-gray-300 font-semibold"}
        `}
      >
        Profile
      </Link>
      <Link
        to={"account"}
        className={`my-3 h-fit w-fit cursor-pointer px-4 transition hover:border-l-2 hover:border-gray-300 hover:font-medium
        ${params == "account" && "border-l-2 border-gray-300 font-semibold"}
        `}
      >
        Account
      </Link>
      <Link
        to={"security"}
        className={`my-3 h-fit w-fit cursor-pointer px-4 transition hover:border-l-2 hover:border-gray-300 hover:font-medium
        ${params == "security" && "border-l-2 border-gray-300 font-semibold"}
        `}
      >
        Security
      </Link>
      <Link
        to={"support"}
        className={`my-3 h-fit w-fit cursor-pointer px-4 transition hover:border-l-2 hover:border-gray-300 hover:font-medium
        ${params == "support" && "border-l-2 border-gray-300 font-semibold"}
        `}
      >
        Support
      </Link>
    </aside>
  );
};

export default SideBar;
