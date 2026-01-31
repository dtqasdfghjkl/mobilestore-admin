import React, { useState, useEffect } from 'react'
import "./categoryList.css"
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../fireConfig';
import { toast } from 'react-toastify';

export default function CategoryList() {
  const docRef = collection(db, "category");
  const categories = [];
  const [data, setData] = useState([]);
  const docSnap  = async () => {
    try {
      let querySnapshort = await getDocs(docRef);
      querySnapshort.forEach((doc) => {
        categories.push({id: doc.id,...doc.data()})
      })
      setData((pre)=> categories)
      console.log(categories); 
      return 1; 
    }
    catch(e) {
      console.log(e);
      return 0;
    }
  }
  useEffect(() => {
    docSnap()
  },[]);
  
  const handleDelete = async(id)=>{
    await deleteDoc(doc(docRef, id));
    toast.success("Delete success");
    docSnap();
      // setData(data.filter(item=>item.id !== id));
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'category',
      headerName: 'Category',
      width: 200,
      renderCell: (params) => {
        return (
            <div className='categoryListItem'>
              <img className='categoryListImg' src={params.row.img} alt="" />
              {params.row.name}
            </div>
        )
    },

    },
    {
      field: 'active',
      headerName: 'status',
      width: 120,
      editable: true,
      renderCell: (params)=> {
        return (
            params.row.active ? "active" : "inactive"
        )
      }
    },
    {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params)=> {
            return (
                <>
                <Link to={"/categories/"+params.row.id}>
                <button className="categoryListEdit">Edit</button>
                </Link>
                
                <DeleteOutline className='categoryListDelete' onClick={() => handleDelete(params.row.id)}/>
                </>
            )
        },
    }
  ];
  return (
    <div className='categoryList' style={{position: "relative"}}>
      <Link to={"/newCategory"} style={{position: "absolute", left: "20px", bottom: "10px", zIndex: "1"}}>
                <button className="categoryAddButton">Create</button>
            </Link>
         <DataGrid rows={data} columns={columns} pageSize={8} checkboxSelection disableSelectionOnClick />
    </div>
  )
}
