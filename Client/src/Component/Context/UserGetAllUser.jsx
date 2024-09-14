import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function UserGetAllUser() {
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getallUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");
        // api call
        //  const response =  await axios.get("http://localhost:8002/user/getUserProfile",{             //before api pass in this port after that check to one port
        const response = await axios.get("api/user/getUserProfile", {             //it also using to frontend and backend same port
          Credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllUser(response.data.filterUsers);
        setLoading(false);
      } catch (error) {
        console.log(`Error in allUser ${error}`);
      }
    };
    getallUsers();
  }, []);
  return [allUser, loading];
}

export default UserGetAllUser;
