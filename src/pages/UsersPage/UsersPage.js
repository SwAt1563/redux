import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const UsersPage = () => {
  const users = useSelector((state) => state.users.users);
  
  const renderedUsers = users.map((user) => {
    return (
      <li key={user.id}>
        <Link to={`/user/${user.id}`}>{user.username}</Link>
      </li>
    );
  });
  return (
    <>
      <div className="users">
        <ol>{renderedUsers}</ol>
      </div>
    </>
  );
};

export default UsersPage;
