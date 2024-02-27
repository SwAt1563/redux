// get posts slice
import { useSelector, useDispatch } from "react-redux";

import { PostComponent } from "./components";
import { useEffect } from "react";
import { fetchPosts } from "../../features/posts/postsSlice";
import { Link } from "react-router-dom";
import { selectPostIds } from "../../features/posts/postsSlice";

const ListPosts = () => {
  const dispatch = useDispatch();

  const orderedPostIds = useSelector(selectPostIds);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (status === "idle") dispatch(fetchPosts());
  }, [status, dispatch]);

  let content;
  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    const postsList = orderedPostIds.map((postId) => (
      <>
        <PostComponent key={postId} postId={postId} />
        <Link to={`/post/${postId}`} className="btn btn-primary">
          View Post
        </Link>
      </>
    ));
    content = <>{postsList}</>;
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <>
      <h1>List Posts</h1>
      <div className="posts container">{content}</div>
    </>
  );
};

export default ListPosts;
