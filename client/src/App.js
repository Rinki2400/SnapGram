import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './component/Auth/AuthForm'; 
import HomeLayout from './component/HomeLayout/HomeLayout';
// import Profile from './component/Profile/Profile'; // 👈 (Optional) Profile Page


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </Router>
  );
}

export default App;
