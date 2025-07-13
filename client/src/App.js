import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TopNav from "./component/Navbar/Navbar";
import Sidebar from "./component/sidebar/Sidebar";
import Feed from "./component/Feed/Feed";
import Rightbar from "./component/RIghtbar/Rightbar";
import PostForm from './component/PostForm/PostForm';
import AuthForm from './component/Auth/AuthForm'; 
// import Profile from './component/Profile/Profile'; // 👈 (Optional) Profile Page

function HomeLayout() {
  return (
    <>

     <div className="App">
       <TopNav />
      <div className="app-container">
        <div className="layout">
          <aside className="sidebar"><Sidebar /></aside>
          <main className="feed">
            <PostForm />
            <Feed />
          </main>
          <aside className="rightbar"><Rightbar /></aside>
        </div>
      </div>
     </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/auth" element={<AuthForm />} />
        {/* <Route path="/profile/:id" element={<Profile />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
