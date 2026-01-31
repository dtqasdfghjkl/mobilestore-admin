import React, { useEffect, useState } from "react";
import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../data";
import { Link } from "react-router-dom";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../fireConfig";
export default function UserList() {
  const [data, setData] = useState(userRows);

  const getUsers = async () => {
    const snapDocs = await getDocs(collection(db, "user"));
    const users = [];
    snapDocs.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    setData(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="usetListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {(params.row.firstname ?? "") + " " + (params.row.lastname ?? "")}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "email",
      width: 200,
    },
    {
      field: "status",
      headerName: "status",
      width: 120,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/users/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>

            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList" style={{ position: "relative" }}>
      <Link
        to={"/newUser"}
        style={{
          position: "absolute",
          left: "20px",
          bottom: "10px",
          zIndex: "1",
        }}
      >
        <button className="userAddButton">Create</button>
      </Link>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={8}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
