import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PostComponent } from "../../components/ListPosts/components";
import { selectPostById } from "../../features/posts/postsSlice";

const PostPage = () => {
  const { postId } = useParams();

  return (
    <>
      <PostComponent key={Number(postId)} postId={Number(postId)} />
      <Link to={`/post/edit/${Number(postId)}`} className="btn btn-primary">
        Edit Post
      </Link>
    </>
  );
};

export default PostPage;
