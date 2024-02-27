import { useDispatch } from "react-redux";

const PostReactions = ({ id, reactions }) => {
  const dispatch = useDispatch();

  const reactionEmoji = {
    like: "👍",
    heart: "❤️",
  };

  return (
    <>
      <div className="reaction-buttons">
        {Object.entries(reactions).map(([reaction, count]) => {
          return (
            <button
              key={reaction}
              className="muted-button reaction-button"
              onClick={() =>
                dispatch({
                  type: "posts/addReaction",
                  payload: {
                    postID: id,
                    reaction: reaction,
                  },
                })
              }
            >
              {reactionEmoji[reaction]} {count}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default PostReactions;
