import axios from "axios";
import React, { useEffect, useState } from "react"

const DataComponent = () => {
    const [dbInfo, setDbInfo] = useState({ impressions: 0, clicks: 0 });


    useEffect(() => {
        const fetchDbInfo = async () => {
          try {
            const response = await axios.get('/api/record-counts');
            setDbInfo(response.data);
          } catch (error) {
            console.error('Error fetching DB info:', error);
          }
        };
    
        fetchDbInfo();
      }, []);
  return (
    <div>{dbInfo ? <p>Total in DB Impressions: {dbInfo.impressions}, Clicks: {dbInfo.clicks}</p> : <p>Loading...</p>}</div>
  )
}
export default DataComponent