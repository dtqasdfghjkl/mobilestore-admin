import { async } from "@firebase/util";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../../fireConfig";
import "./newUser.css";
export default function NewUser() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address1, setAddress] = useState("");
    const navigate = useNavigate();
  const saveInfo = async () => {
    const data = {
      firstname,
      lastname,
      email,
      phone,
      address1,
      date: Timestamp.fromDate(new Date())
    };
    try {
      await addDoc(collection(db, "user"), data);
      navigate("/users");
      toast.success("Add user successfull!");
    } catch (e) {
      console.log(e);
    }
  };

  const checkValid = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(reg.test(email) === false) {
        toast.error("Email invalid!");
        return false;
    }
    if(password.length < 6) {
        toast.error("Password must be at least 6 characters!");
        return false;
    }
    return true;
  }

  const onSave = async (e) => {
    e.preventDefault();
    if(!checkValid())return;
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        saveInfo();
      })
      .catch((err) => {
        if(err.code === "auth/email-already-in-use");
        toast.error("Email already in use!")
      });
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form action="" className="newuserForm">
        <div className="newUserItem">
          <label htmlFor="">First Name</label>
          <input
            type="text"
            placeholder="join"
            className="newUserInput"
            value={firstname}
            onChange={(e)=>setFirstName(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            placeholder="smit"
            className="newUserInput"
            value={lastname}
            onChange={(e)=>setLastName(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="join@gmail.com"
            className="newUserInput"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="password"
            className="newUserInput"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label htmlFor="">Phone</label>
          <input
            type="text"
            placeholder="+1 123 456 789"
            className="newUserInput"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label htmlFor="">Address</label>
          <input
            type="text"
            placeholder="New York"
            className="newUserInput"
            value={address1}
            onChange={(e)=>setAddress(e.target.value)}
          />
        </div>

        <button className="newUserButton" onClick={onSave}>Create</button>
      </form>
    </div>
  );
}
