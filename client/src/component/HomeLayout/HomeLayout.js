import React, { useState, useEffect } from "react";
import TopNav from "../Navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Feed from "../Feed/Feed";
import Rightbar from "../RIghtbar/Rightbar";
import "../../App.css";

function HomeLayout() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="App">
      <TopNav />
      <div className="app-container">
        <div className="layout">
          <aside className="sidebar">
            <Sidebar theme={theme} setTheme={setTheme} />
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
