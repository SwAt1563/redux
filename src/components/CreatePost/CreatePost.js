import { useState } from "react";
import { useDispatch } from "react-redux";
import { UsersOptions } from "./components";
import { addNewPost } from "../../features/posts/postsSlice";

const CreatePost = () => {
  const dispatch = useDispatch();

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [authorId, setAuthorId] = useState("");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setBody(e.target.value);
  const onAuthorChanged = (e) => setAuthorId(e.target.value);

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setShowCreatePost(true);
        dispatch(
          addNewPost({ title, body, userId: authorId })
        ).unwrap();

       

        setTitle("");
        setBody("");
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setShowCreatePost(false);
      }
    }
  };

  const canSave = [title, body, authorId].every(Boolean) && !showCreatePost;
  return (
    <>
      <div className="create-post">
        <h1>Create New Post</h1>

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
            <UsersOptions />
          </select>

          <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
            Save Post
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
