import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../../features/users/usersSlice";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);

  const user = users.find((user) => user.id === Number(userId));

  const authorComponet = user ? (
    <p>author: {user.username}</p>
  ) : (
    <p>author: Unkown</p>
  );
  return <>{authorComponet}</>;
};

export default PostAuthor;
