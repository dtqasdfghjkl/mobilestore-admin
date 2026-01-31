import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../fireConfig";
import "./user.css";
export default function User() {
  const [user, setuser] = useState({});
  const [oldUser, setoldUser] = useState({});

  const params = useParams();
  const docRef = doc(db, "user", params.userId);
  const getUser = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = { id: docSnap.id, ...docSnap.data() };
      setuser(data);
      setoldUser(data);
      console.log(docSnap.data());
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(docRef, user);
      toast.success("Update success!");
      getUser();
    } catch {
      toast.error("Update failed!");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to={"/newUser"}>
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">
                {(oldUser.firstname ?? "") + " " + (oldUser.lastname ?? "")}
              </span>
              <span className="userShowUserTitle">Customer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">
                {(oldUser.firstname ?? "") + " " + (oldUser.lastname ?? "")}
              </span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">1.2.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{oldUser.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{oldUser.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{oldUser.address1}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form action="" className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  className="updateUpdateInput"
                  value={user.firstname}
                  onChange={(e) =>
                    setuser({ ...user, firstname: e.target.value })
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  className="updateUpdateInput"
                  value={user.lastname}
                  onChange={(e) =>
                    setuser({ ...user, lastname: e.target.value })
                  }
                />
              </div>
              {/* <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  className="updateUpdateInput"
                  value={user.password}
                  onChange={(e) => setuser({ ...user, password: e.target.value })}
                />
              </div> */}
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  className="updateUpdateInput"
                  value={user.phone}
                  onChange={(e) => setuser({ ...user, phone: e.target.value })}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  className="updateUpdateInput"
                  value={user.address1}
                  onChange={(e) =>
                    setuser({ ...user, address1: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg"
                  alt=""
                  className="userUpdateImg"
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  name=""
                  id="file"
                  style={{ display: "none" }}
                />
              </div>
              <button className="userUpdateButton" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
