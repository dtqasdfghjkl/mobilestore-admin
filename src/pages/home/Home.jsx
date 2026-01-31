import React, { useEffect, useReducer, useState } from "react";
import Chart from "../../components/chart/Chart";
import Featuredinfo from "../../components/featuredinfo/Featuredinfo";
import "./home.css";
import { userData } from "../../data";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../fireConfig";

export default function Home() {
  const reducer = (state, action) => {
    const sales = JSON.parse(JSON.stringify(state));
    sales[action.id].sales += action.payload;
    return sales;
  };

  const [sales, dispatch] = useReducer(reducer, [
    { name: "Lastyear", sales: 0 },
    { name: "Jan", sales: 0 },
    { name: "Feb", sales: 0 },
    { name: "Mar", sales: 0 },
    { name: "Apr", sales: 0 },
    { name: "May", sales: 0 },
    { name: "Jun", sales: 0 },
    { name: "Jul", sales: 0 },
    { name: "Aug", sales: 0 },
    { name: "Sep", sales: 0 },
    { name: "Oct", sales: 0 },
    { name: "Nov", sales: 0 },
    { name: "Dec", sales: 0 },
  ]);

  const [numTrans, setNumTrans] = useState([0, 0]);
  const [numProduct, setNumProduct] = useState([0, 0]);
  const [product, setProduct] = useState(0);

  const getTransaction = async () => {
    const q = query(collection(db, "order"), orderBy("date", "desc"));
    const docSnap = await getDocs(q);
    const trans = [];
    docSnap.forEach((doc) => {
      const data = doc.data();
      trans.push({ id: doc.id, ...data });
      const date = data.date.toDate();
      if (date.getFullYear() === new Date().getFullYear()) {
        console.log("date", date.getMonth());
        dispatch({ id: date.getMonth() + 1, payload: Number(data.total) });
        if (date.getMonth() === new Date().getMonth()) {
          setNumTrans((pre) => {
            pre[1] += 1;
            console.log(pre);
            return pre;
          });
          setNumProduct((pre) => {
            pre[1] += data.products.reduce(
              (total, item) => total + Number(item.qty),
              0
            );

            return pre;
          });
        }
        if (
          new Date().getMonth() &&
          date.getMonth() === new Date().getMonth() - 1
        ) {
          setNumTrans((pre) => {
            pre[0] += 1;
            return pre;
          });
          setNumProduct((pre) => {
            pre[0] += data.products.reduce(
              (total, item) => total + Number(item.qty),
              0
            );

            return pre;
          });
        }
      } else if (
        date.getFullYear() === new Date().getFullYear() - 1 &&
        date.getMonth() === 11
      ) {
        dispatch({ id: 0, payload: Number(data.total) });
        if (new Date().getMonth() === 0) {
          setNumTrans((pre) => {
            pre[0] += 1;
            return pre;
          });
          setNumProduct((pre) => {
            pre[0] += data.products.reduce(
              (total, item) => total + item.qty,
              0
            );
            return pre;
          });
        }
      } else return;
      console.log(sales);
    });
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <div className="home">
      <Featuredinfo
        sales={sales[new Date().getMonth() + 1]}
        preSales={sales[new Date().getMonth()]}
        trans={numTrans}
        product={numProduct}
      />
      <Chart data={sales} title="Sales Analytics" grid dataKey="sales" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
