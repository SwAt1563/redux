import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const counter = useSelector((state) => state.posts.count);
  const dispatch = useDispatch();

  const increment = () => {
    dispatch({ type: "posts/incCount" });
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Redux App
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/post">
                  Create Post
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/todos">
                  Todos
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-primary" onClick={increment}>
                  {counter}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
