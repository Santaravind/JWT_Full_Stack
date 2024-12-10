import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Dasboard() {

  const [data, setdata] = useState([]);

    const Token = localStorage.getItem("token");

const fetchAllusers= async()=>{
    try{
         const response =await axios.get("http://localhost:8080/admin/get-all-users",{
            headers:{
                'Authorization':`Bearer ${Token}`
            }
         })

         console.log(response.data);

         if(response.data && Array.isArray(response.data.ourUsersList)){
            setdata(response.data.ourUsersList);
         }else{
            console.log("not valid formate!")
           
         }
    }catch(error){
        console.log(error);

    }
}


    useEffect(()=>{
        fetchAllusers();
    },[])

  return (
    <div><div className="flex justify-center items-center h-screen">
    <h1 className="text-2xl font-bold">Welcome to the app</h1>
  </div>
      <h1>welcome to app .</h1>

      <div>      
        <ul>  
        {data.length > 0 ? ( // Check if the data array is not empty
            data.map((user) => (
              <li key={user.id}>
                Name: {user.name ? user.name : 'N/A'}, Email: {user.email}, Role: {user.role}
              </li>
            ))
          ) : (
            <li>No users available</li>
          )}
           </ul>
       
      </div>

    </div>
  )
}

export default Dasboard
