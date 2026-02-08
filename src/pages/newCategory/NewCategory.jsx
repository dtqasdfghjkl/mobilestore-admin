import React, { useState, useEffect } from 'react'
import "./newCategory.css"
import { collection, addDoc } from "firebase/firestore"; 
import {db, storage} from '../../fireConfig';
import { ref, uploadBytes } from "firebase/storage";
import { uploadImg, uploadImgCloud } from '../../components/uploadImg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function NewCategory() {
    const [img, setImg] = useState(null);
    const [name, setName] = useState("a");
    const [desc, setDesc] = useState("a");
    const [active, setActive] = useState(true);
    const navigate = useNavigate();

    const onSave = async (e) => {
         e.preventDefault();
      
        let url = "";
        if(img != null) url = await uploadImgCloud(img);
        const data = {name, img: url, desc, active};

        console.log(data);
        try {
            await addDoc(collection(db, "category"), data);
            navigate("/categories");
            toast.success("Add category successfull!");
            return;
        }
        catch(e) {
            console.log(e);
        }
      
    }

   
    
  return (
    <div className='newCategory'>
        <h1 className="newCategoryTitle">New Category</h1>
        <form action="" className="newCategoryForm">
            <div className="newCategoryItem">
                <label>Image</label>
                <input type="file" onChange={(e) => setImg(e.target.files[0])}/>
            </div>
            <div className="newCategoryItem">
                <label>Name</label>
                <input type="text" placeholder='Iphone' value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="newCategoryItem">
                <label>Description</label>
                <input type="text" placeholder='Iphone'value={desc} onChange={(e) => setDesc(e.target.value)}/>
            </div>
 
            <div className="newCategoryItem">
                <label>Active</label>
                <select value={active} onChange={(e) => setActive(e.target.value)}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <button className="newCategoryButton" onClick={(e) => onSave(e)}>Create</button>
        </form>
    </div>
  )
}
