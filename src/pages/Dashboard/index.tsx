import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider"
import axios from "../../api/axios";


export const Dashboard = () => {

  const { setToken } = useAuth();
  

   


    

    return (
      <div className="h-screen flex justify-center items-center">Dashboard Screen
        <button onClick={() => setToken()  } >RESET</button>
        
        
       
      </div>
      
    )
  }
  