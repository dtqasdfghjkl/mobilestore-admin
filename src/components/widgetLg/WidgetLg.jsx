import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../fireConfig";
import "./widgetLg.css";
export default function WidgetLg() {
  const [transaction, setTransaction] = useState([]);
  

  const getTransaction = async () => {
    const q = query(collection(db, "order"), orderBy("date", "desc"), limit(5));
    const docSnap = await getDocs(q);
    const trans = [];
    docSnap.forEach((doc) => {
      trans.push({ id: doc.id, ...doc.data() });
    });
    setTransaction(trans);
  };

  useEffect(() => {
    getTransaction();
  }, []);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <span className="widgetLgTitle">Last transactions</span>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Custommer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>

        {transaction.map((item) => {
          return (
            <tr className="widgetLgTr" key={item.id}>
              <td className="widgetLgTd">
                <img
                  src="https://guantanamocity.org/wp-content/uploads/2020/12/tong-hop-avatar-anime-avatar-anime-doi-cool-ngau-cute-panda-brown-1.jpg"
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{item.firstName} {item.lastName}</span>
              </td>
              <td className="widgetLgDate">{item.date && item.date.toDate().toDateString()}</td>
              <td className="widgetLgAmount">${item.total}.00</td>
              <td className="widgetLgStatus">
                <Button type={item.status} />
              </td>
            </tr>
          );
        })}

      </table>
    </div>
  );
}
