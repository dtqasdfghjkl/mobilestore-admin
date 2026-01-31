import { async } from "@firebase/util";
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadImg } from "../../components/uploadImg";
import { db } from "../../fireConfig";
import "./newProduct.css";

export default function NewProduct() {
  const [img, setImg] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(100);
  const [active, setActive] = useState(true);
  const [infomation, setInfomation] = useState("");
  const [sale, setSale] = useState(0);
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getCategory = async () => {
    const docSnap = await getDocs(collection(db, "category"));
    const cate = [];
    docSnap.forEach((item) => {
      cate.push({ id: item.id, name: item.data().name });
    });
    setCategory(cate[0].id);
    setCategories(cate);
  };

  const onSave = async (e) => {
    e.preventDefault();

    let url = "";
    if (img != null) url = await uploadImg(img);
    const data = {
      name,
      img: url,
      price: Number(price),
      sale: Number(sale),
      stock,
      active,
      description,
      infomation,
      sold: 0,
      categoryId: category,
      date: Timestamp.fromDate(new Date()),
    };

    console.log(data);
    try {
      await addDoc(collection(db, "product"), data);
      navigate("/products");
      toast.success("Add product successfull!");
      return;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="newProduct">
      <h1 className="newProductTitle">{console.log(category)}New Product</h1>
      <form action="" className="newProductForm">
        <div className="newProductItem">
          <label htmlFor="file">Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="newProductInfo">
          <div className="newProductLeftSide">
            <div className="newProductItem">
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Apple Airpods"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="newProductItem">
              <label htmlFor="">Price</label>
              <input
                type="text"
                placeholder="100.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="newProductItem">
              <label htmlFor="">Stock</label>
              <input
                type="text"
                placeholder="123"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="newProductItem">
              <label htmlFor="">Category</label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((item) => {
                  return <option value={item.id}>{item.name}</option>;
                })}
              </select>
            </div>
            <div className="newProductItem">
              <label htmlFor="">Active</label>
              <select
                name="active"
                id="active"
                value={active}
                onChange={(e) => setActive(e.target.value)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div className="newProductRightSide">
            <div className="newProductItem">
              <label htmlFor="">Sale</label>
              <input
                type="text"
                placeholder="Apple Airpods"
                value={sale}
                onChange={(e) => setSale(e.target.value)}
              />
            </div>
            <div className="newProductItem">
              <label htmlFor="">Description</label>
              <textarea
                name="desc"
                rows="6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="newProductItem">
              <label htmlFor="">Infomation</label>
              <textarea
                name="info"
                rows="6"
                value={infomation}
                onChange={(e) => setInfomation(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button className="newProductButton" onClick={(e) => onSave(e)}>
          Create
        </button>
      </form>
    </div>
  );
}
