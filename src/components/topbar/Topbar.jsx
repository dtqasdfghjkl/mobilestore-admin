import React, { useContext, useEffect, useState } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import AuthContext from "../../auth-context";
import { useNavigate } from "react-router-dom";
import { db } from "../../fireConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Topbar() {
  const [mess, setMess] = useState(0);
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("login")

  const getMess = async () => {
    const snap = await getDocs(query(collection(db, "message"), where("status", "==", "unread")));
    setMess(snap.size)
  }

  const handleLogout = () => {
    localStorage.setItem("login", "");
    navigate("/login");
  };

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
    getMess();
  },[])

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">admin</span>
        </div>
        <div className="topRight">
          <div className="topvarIconContainer" onClick={()=>navigate("/message")}>
            <NotificationsNone />
            {mess !== 0 && <span className="topIconBag">{mess}</span>}
          </div>
          <div className="topvarIconContainer">
            <Language />
            <span className="topIconBag">2</span>
          </div>
          <div className="topvarIconContainer">
            <Settings />
          </div>
          <div className="topbarAvatar">
            <img
              src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg"
              alt=""
              className="topAvatar"
            />
        
              <ul className="topbarDropList">
                <li onClick={handleLogout}>Log out</li>
              </ul>
            
          </div>
        </div>
      </div>
    </div>
  );
}
