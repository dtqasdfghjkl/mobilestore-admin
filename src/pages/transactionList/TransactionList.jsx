import React, { useEffect, useState } from "react";
import "./transactionList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, KeyboardArrowDown } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../fireConfig";
import { async } from "@firebase/util";
import { toast } from "react-toastify";

export default function TransactionList() {
  const docRef = collection(db, "order");
  const [data, setData] = useState([]);

  const pendingStyle = {
    backgroundColor: "#ebf1fe",
    color: "#3b5ab0",
  };

  const approvedStyle = {
    backgroundColor: "#e5faf2",
    color: "#3bb077",
  };

  const declinedStyle = {
    backgroundColor: "#fff0f1",
    color: "#b03b4e",
  };

  const cancelledStyle = {
    backgroundColor: "#feebeb",
    color: "#b03b3b",
  }

  const penCancelledStyle = {
    backgroundColor: "#fef3eb",
    color: "#b0643b",
  }

  const docSnap = async () => {
    const transaction = [];
    try {
      let querySnapshort = await getDocs(docRef);
      querySnapshort.forEach((doc) => {
        transaction.push({ id: doc.id, ...doc.data() });
      });
      setData(transaction);
      console.log(transaction);
      return 1;
    } catch (e) {
      console.log(e);
      return 0;
    }
  };
  useEffect(() => {
    docSnap();
  }, []);

  const handleUpdateState = async (e, id) => {
    await updateDoc(doc(db, "order", id), {"status": e.target.value});
    toast.success("Update success!");
    docSnap();
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(docRef, id));
    docSnap();
    // setData(data.filter(item=>item.id !== id));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "customer",
      headerName: "custommer",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="transactionListItem">
            {/* <img className='categoryListImg' src={params.row.img} alt="" /> */}
            {params.row.firstName + params.row.lastName}
          </div>
        );
      },
    },

    {
      field: "address",
      headerName: "address",
      width: 200,
      editable: true,
    },

    {
      field: "total",
      headerName: "total",
      width: 120,
      editable: true,
    },

    {
      field: "date",
      headerName: "date create",
      width: 200,
      editable: true,
      renderCell: (params) => {
        return (
          params.row.date.toDate().toDateString() +" "+
          params.row.date.toDate().toLocaleTimeString()
        );
      },
    },

    {
      field: "status",
      headerName: "status",
      width: 120,
      editable: true,
      renderCell: (params) => {
        const stt = params.row.status;
        return (
          <select
            value={params.row.status}
            className={"transactionListUpdateSelect"}
            style={
              stt === "Pending"
                ? pendingStyle
                : stt === "Approved"
                ? approvedStyle
                : stt === "Declined"
                ? declinedStyle
                : stt === "Cancelled"
                ? cancelledStyle
                : penCancelledStyle
            }
            onChange={(e) => handleUpdateState(e, params.row.id)}
          >
            <option value="Pending" style={pendingStyle}>
              Pending
            </option>
            <option value="Approved" style={approvedStyle}>
              Approved
            </option>
            <option value="Declined" style={declinedStyle}>
              Declined
            </option>
            <option value="Cancelled" style={cancelledStyle}>
              Cancelled
            </option>
            <option value="PendingCancel" style={penCancelledStyle}>
              Pen Cancel
            </option>
          </select>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/transaction/" + params.row.id}>
              <button className="transactionListDetail">Detail</button>
            </Link>
            <DeleteOutline
              className="transactionListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="transactionList">
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
