import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import UserGetAllUser from "../Context/UserGetAllUser";
import UseConversation from "../StateMangement/UseConversation";
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState("");
  const [allUser] = UserGetAllUser();
  const { setSelectedConversation } = UseConversation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) {
      return;
    }
    const conversation = allUser.find((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User Not Found");
    }
  };
  return (
    <div>
      <div className="h-[12vh]">
        <div className="px-6 py-4">
          <form onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center gap-2 w-[80%]">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="grow outline-none text-black"
                placeholder="Search"
              />
              <button type="submit">
                <IoSearchSharp className="text-black text-2xl hover:bg-zinc-200 rounded-full duration-300" />
              </button>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Search;
