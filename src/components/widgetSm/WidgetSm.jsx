import React, { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../fireConfig";
export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  const getNewUser = async () => {
    const q = query(collection(db, "user"), orderBy("date", "desc"), limit(5));
    const docSnap = await getDocs(q);
    const list = [];
    docSnap.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    setUsers(list);
  };

  useEffect(() => {
    getNewUser();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Menbers</span>
      <ul className="widgetSmList">
        {users.map((item) => {
          return (
            <li className="widgetSmListItem">
              <img
                src="https://guantanamocity.org/wp-content/uploads/2020/12/tong-hop-avatar-anime-avatar-anime-doi-cool-ngau-cute-panda-brown-1.jpg"
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{item.firstname} {item.lastname}</span>
                <span className="widgetSmUserTitle">{item.email}</span>
              </div>

              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
