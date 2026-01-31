import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../data";
import { Publish } from "@material-ui/icons";
import { db } from "../../fireConfig";
import { getDoc, doc, updateDoc, getDocs, collection } from "firebase/firestore";
import { uploadImg } from "../../components/uploadImg";
import { toast } from "react-toastify";

export default function Product() {
  const [fileImg, setFileImg] = useState(null);
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(100);
  const [sale, setSale] = useState(0);
  const [active, setActive] = useState(true);
  const [infomation, setInfomation] = useState("");
  const params = useParams();
  const docref = doc(db, "product", params.productId);
  const [data, setData] = useState({});
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);

  const getCategory = async () => {
    const docSnap = await getDocs(collection(db, "category"));
    const cate = [];
    docSnap.forEach((item) => {
      cate.push({ id: item.id, name: item.data().name });
    });
    setCategory(cate[0].id);
    setCategories(cate);
  };

  const getProduct = async () => {
    const docSnap = await getDoc(docref);
    if (docSnap.exists()) {
      const d = docSnap.data();
      setData(d);
      setName(d.name);
      setDescription(d.description);
      setImg(d.img);
      setPrice(d.price);
      setStock(d.stock);
      setInfomation(d.infomation);
      setActive(d.active);
      setSale(d.sale);
      setCategory(d.categoryId);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const handleImg = (e) => {
    setFileImg(e.target.files[0]);
    const reader = new FileReader();
    console.log(2);
    reader.onload = () => {
      if (reader.readyState === 2) {
        console.log(1);
        setImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    let imgURL = data.img;
    if (fileImg != null) imgURL = await uploadImg(fileImg);
    await updateDoc(docref, {
      name: name,
      img: imgURL,
      price,
      sale,
      stock,
      infomation,
      description,
      active,
      categoryId: category
    });
    console.log("update success");
    toast.success("Update success!");
    getProduct();
  };

  useEffect(() => {
    getCategory();
    getProduct();
  }, []);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Sale Perfomance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={data.img} alt="" className="productInfoImg" />
            <span className="productName">{data.name}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">{data.sold}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">category:</span>
              <span className="productInfValue">{data.categoryId? categories.filter(item => item.id === data.categoryId)[0].name :"Pantony"}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">active:</span>
              <span className="productInfValue">
                {data.active ? "yes" : "no"}
              </span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">
                {data.stock ? "yes" : "no"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form action="" className="productForm">
          <div className="productFormLeft">
            <div className="productInfoLeft">
              <label>Product Name</label>
              <input
                type="text"
                placeholder="Apple airPord"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Product Price</label>
              <input
                type="text"
                placeholder="100.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <label>Sale off</label>
              <input
                type="text"
                placeholder="10.00"
                value={sale}
                onChange={(e) => setSale(e.target.value)}
              />
              <label>Stock</label>
              <input
                type="text"
                placeholder="100"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="productInfoRight">
              <label>Active</label>
              <select
                name="active"
                id="active"
                value={active}
                onChange={(e) => setActive(e.target.value)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <label htmlFor="">Category</label>
              <select
                name="category"
                id="category"
                value={data.categoryId}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((item) => {
                  return <option value={item.id}>{item.name}</option>;
                })}
              </select>
              <div className="productInfo">
                <label>Infomation</label>
                <textarea rows={3} />
              </div>
              <div className="productInfo">
                <label>Description</label>
                <textarea rows={3} />
              </div>
            </div>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => handleImg(e)}
              />
            </div>
            <button className="productButton" onClick={(e) => onUpdate(e)}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
