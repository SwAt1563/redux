import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPost, deletePost } from "../../features/posts/postsSlice";
import { selectPostById } from "../../features/posts/postsSlice";

const EditPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector((state) => state.users.users);

  const [showEditPost, setShowEditPost] = useState(false);
  const [requestStatus, setRequestStatus] = useState("idle");
  const [title, setTitle] = useState(post?.title);
  const [body, setBody] = useState(post?.body);
  const [authorId, setAuthorId] = useState(post?.userId);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setBody(e.target.value);
  const onAuthorChanged = (e) => setAuthorId(e.target.value);

  const usersList = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setShowEditPost(true);
        dispatch(
          editPost({
            id: post.id,
            title,
            body,
            userId: Number(authorId),
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle("");
        setBody("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setShowEditPost(false);
      }
    }
  };

  const onDeletePostClicked = () => {
    if (requestStatus === "idle") {
      try {
        setRequestStatus("pending");
        dispatch(deletePost(post.id)).unwrap();
        navigate("/");
      } catch (err) {
        console.error("Failed to delete the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const canSave = [title, body, authorId].every(Boolean) && !showEditPost;

  return (
    <>
      <div className="create-post">
        <h1>Edit Post</h1>

        <form>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />

          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={body}
            onChange={onContentChanged}
          />

          <label htmlFor="postAuthor">Author:</label>
          <select id="postAuthor" value={authorId} onChange={onAuthorChanged}>
            <option value=""></option>
            {usersList}
          </select>

          <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
            Save Post
          </button>
        </form>
        {/* delete post */}
        <button type="button" onClick={onDeletePostClicked}>
          Delete Post
        </button>
      </div>
    </>
  );
};

export default EditPostPage;
