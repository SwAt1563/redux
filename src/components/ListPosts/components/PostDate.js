// date-fns format
import { parseISO, formatDistanceToNow } from "date-fns";

const PostDate = ({ date }) => {
  let timeAgo = "";
  if (date) {
    const dateParsed = parseISO(date);
    const timePeriod = formatDistanceToNow(dateParsed);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <>
      <div className="timePeriod"> {timeAgo}</div>
    </>
  );
};

export default PostDate;
