import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import {
  Home,
  PostPage,
  EditPostPage,
  CreatePostPage,
  UserProfile,
  UsersPage,
  TodosPage,
} from "./pages/index";

// For handle the dates
// date-fns is a modern JavaScript date utility library that offers the most comprehensive toolset for manipulating JavaScript dates in a browser & Node.js.

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Header } from "./components";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="post">
            <Route index element={<CreatePostPage />} />
            <Route path=":postId" element={<PostPage />} />
            <Route path="edit/:postId" element={<EditPostPage />} />
          </Route>
          <Route path="user">
            <Route index element={<UsersPage />} />
            <Route path=":userId" element={<UserProfile />} />
          </Route>
          <Route path="todos" element={<TodosPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
