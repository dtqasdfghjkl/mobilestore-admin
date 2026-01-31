import React, { useEffect, useState } from "react";
import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../data";
import { Link } from "react-router-dom";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../../fireConfig";
import { toast } from "react-toastify";

export default function ProductList() {
  const docRef = collection(db, "product");
  const products = [];
  const [data, setData] = useState([]);
  const docSnap = async () => {
    try {
      let querySnapshort = await getDocs(docRef);
      querySnapshort.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      setData((pre) => products);
      console.log(products);
      return 1;
    } catch (e) {
      console.log(e);
      return 0;
    }
  };
  useEffect(() => {
    docSnap();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(docRef, id));
    toast.success("Delete success!");
    docSnap();
    // setData(data.filter(item=>item.id !== id));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 200,
    },
    {
      field: "active",
      headerName: "status",
      width: 120,
      editable: true,
      renderCell: (params) => {
        return params.row.active ? "active" : "inactive";
      },
    },
    {
      field: "price",
      headerName: "Price",
      sortable: false,
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/products/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>

            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList" style={{position: "relative"}}>
      <Link to="/newProduct" style={{position: "absolute", left: "20px", bottom: "10px" , zIndex: "1"}}>
        <button className="productAddButton">Create</button>
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
