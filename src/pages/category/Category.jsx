import React, { useEffect, useState } from 'react'
import "./category.css"
import { Link, useParams } from 'react-router-dom'
import { Publish } from '@material-ui/icons'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../fireConfig'
import { async } from '@firebase/util'
import { uploadImg, uploadImgCloud } from '../../components/uploadImg'
import { toast } from 'react-toastify'
export default function Category() {
    const [fileImg, setFileImg] = useState(null);
    const [img, setImg] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [active, setActive] = useState(true);
    const params = useParams();
    const docref = doc(db, "category", params.categoryId);
    const [data, setData] = useState({name:"", description:"", img:"", active:""});
    const getCategory = async () => {
        const docSnap = await getDoc(docref);
        if (docSnap.exists()) {
            const d = docSnap.data();
            setData(d);
            setName(d.name);
            setDesc(d.desc);
            setImg(d.img);
            setActive(d.active);
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
    }

    const handleImg = (e) => {
        setFileImg(e.target.files[0]);
        const reader = new FileReader();
        console.log(2);
        reader.onload = () => {
            if(reader.readyState === 2) {
                console.log(1);
                setImg(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const onUpdate = async(e) => {
        e.preventDefault();
        let imgURL = data.img;
        if(fileImg != null) imgURL = await uploadImgCloud(fileImg);
        await updateDoc(docref, {name: name, img: imgURL, desc, active});
        console.log("update success");
        toast.success("Update success!")
        getCategory();
    }
    
    useEffect(() =>{
        getCategory();
    },[])

  return (
    <div className='category'>
        <div className="categoryTitleContainer">
            <h1 className="categoryTitle">Edit Category</h1>
            <Link to={"/newCategory"}>
                <button className="categoryAddButton">Create</button>
            </Link>
            
        </div>
        <div className="categoryContainer">
            <div className="categoryShow">
                <div className="categoryShowTop">
                    <img src={data.img} alt="" className="categoryShowImg" />
                <div className="categoryShowTopTitle">
                    <span className="categoryShowCategoryname">{data.name}</span>
                </div>
                </div>
                <div className="categoryShowBottom">
                    <span className="categoryShowTitle">Description</span>
                    <div className="categoryShowInfo">
                        <span className="categoryShowInfoTitle">{data.desc}</span>
                    </div>
                </div>
            </div>
            <div className="categoryUpdate">
                <span className="categoryUpdateTitle">Edit</span>
                <form action="" className="categoryUpdateForm">
                    <div className="categoryUpdateLeft">
                        <div className="categoryUpdateItem">
                            <label>Category Name</label>
                            <input type="text" className="categoryUpdateInput name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="categoryUpdateItem">
                            <label>Category Description</label>
                            <textarea name="description" rows="4" cols="50" className="categoryUpdateInput" value={desc} onChange={(e) => setDesc(e.target.value)}/>
                        </div>
                        <div className="categoryUpdateItem">
                            <label>Active</label>
                            <select name="active" id="cactive" value={active}>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="categoryUpdateRight">
                        <div className="categoryUpdateUpload">
                            <img src={img} alt="" className="categoryUpdateImg" />
                            <label htmlFor="file"><Publish className='categoryUpdateIcon'/></label>
                            <input type="file" name="" id="file" style={{display: "none"}} onChange={(e) => handleImg(e)}/>
                        </div>
                        <button className="categoryUpdateButton" onClick={(e) => onUpdate(e)}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

  )
}
