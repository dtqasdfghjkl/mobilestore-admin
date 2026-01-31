import React from 'react'
import "./chart.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Chart({title, data, dataKey, grid}) {
      
  return (
    <div className="chart">
        <h3 className="chartTitle">{title}</h3>
        <ResponsiveContainer width="100%" aspect={4/1} > 
              <LineChart
                data={data}>
                {grid && <CartesianGrid strokeDasharray="3 3" />}
                <XAxis dataKey="name" stroke='#5550bd'/>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey= {dataKey} stroke='#5550bd' activeDot={{ r: 8 }} />
            
              </LineChart>
            </ResponsiveContainer>
    </div>
  )
}
