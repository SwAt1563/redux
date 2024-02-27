import { useSelector } from "react-redux";
import { selectAllUsers } from "../../../features/users/usersSlice";

const UsersOptions = () => {
  //const users = useSelector((state) => state.users.users);
  const users = useSelector((state) => selectAllUsers(state));
  const usersList = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}aaa
      </option>
    );
  });

  return usersList;
};

export default UsersOptions;
