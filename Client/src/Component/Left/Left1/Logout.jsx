import { useState } from "react";
import { LuLogOut } from "react-icons/lu";
import axios from "axios";
import cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    console.log(loading);
    setLoading(true);
    try {
      const res = await axios.post("api/user/logout");
      localStorage.removeItem("chat");
      cookies.remove("token");
      console.log(res);
      toast.success("logout Sucessfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Logout !");
    }
  };

  return (
    <div className="w-[5%] bg-slate-600 text-white flex flex-col justify-end">
      <div className="px-3 align-bottom">
        <button onClick={handleLogout}>
          <LuLogOut className="text-black  text-2xl  hover:bg-zinc-200 duration-300" />
        </button>
      </div>
    </div>
  );
}

export default Logout;
