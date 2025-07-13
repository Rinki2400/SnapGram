import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./component/Auth/AuthForm";
import HomeLayout from "./component/HomeLayout/HomeLayout";
import PrivateRoute from "./routes/PrivateRoute";

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
      </Routes>
    </Router>
  );
}

export default App;
