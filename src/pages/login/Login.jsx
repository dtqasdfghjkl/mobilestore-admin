import React, { useContext, useState } from "react";
import "./login.css";
import AuthContext from "../../auth-context";
import { useNavigate } from "react-router-dom";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../fireConfig";
import { Fastfood } from "@material-ui/icons";
export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
      e.preventDefault();
      const q = query(collection(db, "admin"), where("username", "==", username));
      const snapDoc = await getDocs(q);
      let admin = null;
      snapDoc.forEach(doc => {
          admin = doc.data();
      });
      if(admin) {
        if(admin.password === password) {
            setErr(false);
            localStorage.setItem("login", "true")
            auth.login();
            navigate("/");
            return;
        }
      }
      setErr(true);
  };
  return (
    <div className="login">
      <form action="#" className="login-form">
        <h2>Admin User Login</h2>
        <hr />
        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && <span className="login-err">*Username or password is incorrect. Try again!</span>}
        <input className="login-btn" type="submit" onClick={handleLogin} value="LOGIN" />
    
      </form>
    </div>
  );
}
