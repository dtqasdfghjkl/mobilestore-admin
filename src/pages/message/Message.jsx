import { collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from '../../fireConfig';
import "./message.css"

export default function Message() {
    const [mess, setMess] = useState([]);
    const getMess = async () => {
        const snap = await getDocs(query(collection(db, "message"), orderBy("date","desc")));
        const list = [];
        snap.forEach(doc => {
            list.push({id: doc.id, ...doc.data()});
        })
       console.log(list)
        setMess(list);
    }

    const handleRead = async (item) => {
        if(item.status === "read") return;
        await updateDoc(doc(db, "message", item.id), {status: "read"});
        getMess();
    }

    useEffect(() => {
        getMess()
    },[])

  return (
    <div className='message'>
        {mess.map((item, index) => {
            return <div className={"messageItem "+item.status} onClick={() => handleRead(item)}>
                <h2>{item.type}</h2>
                <p>Customer want to cancel order #
                    <Link to={"/transaction/"+item.order}>
                    {item.order}
                    </Link>
                    </p>
                <p>Reason: {item.text}</p>
            </div>
        })}
    </div>
  )
}
