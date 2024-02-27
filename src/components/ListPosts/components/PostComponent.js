// PostComponent.js
// import React from "react";
import { PostAuthor, PostDate, PostReactions } from "./index";
import { useSelector } from "react-redux";
import { selectPostById } from "../../../features/posts/postsSlice";

const PostComponent = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  return (
    <div className="card">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <PostAuthor userId={post.userId} />
      <PostDate date={post.date} />
      <PostReactions id={post.id} reactions={post.reactions} />
    </div>
  );
};

export default PostComponent;
