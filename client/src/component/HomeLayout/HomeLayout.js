import TopNav from "../Navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Feed from "../Feed/Feed";
import Rightbar from "../RIghtbar/Rightbar";

import '../../App.css';

function HomeLayout() {
  return (
    <div className="App">
      <TopNav />
      <div className="app-container">
        <div className="layout">
          <aside className="sidebar">
            <Sidebar />
          </aside>
          <main className="feed">
            <Feed />
          </main>
          <aside className="rightbar">
            <Rightbar />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
