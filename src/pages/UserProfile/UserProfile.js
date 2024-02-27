import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserPostsById } from "../../features/posts/postsSlice";

const UserProfile = () => {
  const { userId } = useParams();

  const userPosts = useSelector((state) =>
    selectUserPostsById(state, Number(userId))
  );

  const userPostsTitles = userPosts.map((post) => {
    return (
      <li key={post.id}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </li>
    );
  });

  return (
    <>
      <div className="posts">
        <ol>{userPostsTitles}</ol>
      </div>
    </>
  );
};

export default UserProfile;
