import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./component/Auth/AuthForm";
import HomeLayout from "./component/HomeLayout/HomeLayout";
import PrivateRoute from "./routes/PrivateRoute";
import Profile from "./component/Profile/Profile";
import SavedPosts from "./component/SavePost/SavedPosts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthForm />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomeLayout />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <PrivateRoute>
              <SavedPosts />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
