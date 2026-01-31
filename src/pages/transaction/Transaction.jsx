import { DataGrid } from "@material-ui/data-grid";
import {
  DeleteOutline,
  LocationSearching,
  MailOutline,
  PhoneAndroid,
  PhoneAndroidOutlined,
} from "@material-ui/icons";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../fireConfig";
import "./transaction.css";

export default function Transaction() {
  const params = useParams();
  const [data, setData] = useState({ products: [] });

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
  };

  const penCancelledStyle = {
    backgroundColor: "#fef3eb",
    color: "#b0643b",
  };

  const docRef = doc(db, "order", params.transactionId);
  const docSnap = async () => {
    try {
      let order = await getDoc(docRef);
      console.log(order);
      if (order.exists()) {
        setData({ id: order.id, ...order.data() });
      }
      return 1;
    } catch (e) {
      console.log(e);
      return 0;
    }
  };

  const handleUpdateState = async (e, id) => {
    await updateDoc(docRef, {
      products: data.products.map((item) => {
        if (item.id === id) {
          item.status = e.target.value;
        }
        return item;
      }),
    });
    toast.success("Update success!");
    docSnap();
  };

  const handleUpdateTransState = async (e) => {
    await updateDoc(docRef, {
      status: e.target.value
    });
    toast.success("Update success!");
    docSnap();
  }

  const handleDelete = async (id) => {
    // setData(data.filter(item=>item.id !== id));
  };

  useEffect(() => {
    docSnap();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    {
      field: "customer",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="transactionItem">
            <img className="transactionImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },

    {
      field: "price",
      headerName: "price",
      width: 120,
      editable: true,
      renderCell: (params) => {
        return <span>${params.row.price - params.row.sale}.00</span>;
      },
    },

    {
      field: "qty",
      headerName: "qty",
      width: 120,
      editable: true,
    },

    {
      field: "total",
      headerName: "total",
      width: 120,
      editable: true,
      renderCell: (params) => {
        return (
          <span>
            ${(params.row.price - params.row.sale) * params.row.qty}.00
          </span>
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
            className={"transactionUpdateSelect"}
            style={
              stt === "Declined"
                ? declinedStyle
                : stt === "Approved"
                ? approvedStyle
                : pendingStyle
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
          </select>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="transactionDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="transaction">
      <div className="transactionDetail">
        <div className="transactionInfo transactionLeft">
          <div className="transactionCustomer">
            <img
              src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg"
              alt=""
              className="transactionCustomerImg"
            />
            <h3>{data.firstName + " " + data.lastName}</h3>
          </div>

          <div className="transactionInfoItem">
            <MailOutline className="transactionIcon" />
            <div className="transactionInfoValue"> {data.email}</div>
          </div>
          <div className="transactionInfoItem">
            <PhoneAndroidOutlined className="transactionIcon" />
            <div className="transactionInfoValue"> {data.phone}</div>
          </div>
          <div className="transactionInfoItem">
            <LocationSearching className="transactionIcon" />
            <div className="transactionInfoValue"> {data.address}</div>
          </div>
        </div>
        <div className="transactionInfo transactionRight">
          <h3>Transaction </h3>
          <div className="transactionInfoContainer">
            <div className="transactionInfoItem item-50">
              <div className="transactionInfoKey">ID:</div>
              <div className="transactionInfoValue"> {data.id}</div>
            </div>
            <div className="transactionInfoItem item-50">
              <div className="transactionInfoKey">Date:</div>
              <div className="transactionInfoValue">
                {" "}
                {data.date &&
                  data.date.toDate().toDateString() +
                    " " +
                    data.date.toDate().toLocaleTimeString()}
              </div>
            </div>
            <div className="transactionInfoItem item-50">
              <div className="transactionInfoKey">Shipping:</div>
              <div className="transactionInfoValue"> {data.shipping}</div>
            </div>
            <div className="transactionInfoItem item-50">
              <div className="transactionInfoKey">Payment:</div>
              <div className="transactionInfoValue"> {data.payment}</div>
            </div>
            <div className="transactionInfoItem item-50">
              <div className="transactionInfoKey">Status:</div>
              <div className="transactionInfoValue">
                {" "}
                <select
                  value={data.status}
                  onChange={handleUpdateTransState}
                  className={"transactionUpdateSelect"}
                  style={
                    data.status === "Declined"
                      ? declinedStyle
                      : data.status === "Approved"
                      ? approvedStyle
                      : data.status === "Pending"
                      ? pendingStyle
                      : data.status === "Cancelled"
                      ? cancelledStyle
                      : penCancelledStyle
                  }
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
              </div>{" "}
            </div>
            <div className="transactionInfoItem item-50">
              <div className="transactionInfoKey">Total:</div>
              <div className="transactionInfoValue boldValue"> $150.00</div>
            </div>
          </div>
        </div>
      </div>
      <DataGrid
        className="transactionInfo"
        rows={data.products}
        columns={columns}
        pageSize={8}
        autoHeight={true}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
