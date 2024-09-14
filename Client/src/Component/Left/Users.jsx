import UserGetAllUser from "../Context/UserGetAllUser";
import User from "./User";
function Users() {
  const [allUser] = UserGetAllUser();
  return (
    <div
      style={{ maxHeight: "calc(84vh - 10vh)" }}
      className="flex-1 py-2 overflow-y-auto"
    >
      {allUser.map((user, index) => {
        return <User key={index} user={user} />;
      })}
    </div>
  );
}

export default Users;
