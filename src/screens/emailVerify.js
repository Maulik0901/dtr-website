import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
export default function EmailVerify(props) {
    const history = useNavigate();
    const [status,setStatus] = useState(0);
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get("token")
    useEffect(()=> {
        console.log({token})
        if(token){
            verifyToken(token)
        }
        
    },[token])
    function verifyToken(token){
        try {
            var prams = jwt_decode(token);
            console.log({prams})
            axios
            .post(
              process.env.REACT_APP_API_URL+`user/verfyEmail`,
              {
                email:prams.email
              },
              {
                headers: {
                  "Content-Type": "application/json"                 
                },
              }
            )
            .then((res) => {
                setStatus(1);
                localStorage.removeItem("dtrmatrimonyjwt");
                localStorage.removeItem("dtrusergender");
                setTimeout(()=> {
                    history("/login");
                },8000)
            })
            .catch((err) => {
                setStatus(2);
            });
        } catch (err){
            console.log(err);
            setStatus(2);
        }
    }
  
  return (
    <>
        <div className="center">
            {
                status == 0 && <h3>Loading...</h3>
            }
            {
                status == 1 && <h3>Your Email is Approved</h3>
            }
            {
                status == 2 && <h3>Your Email is Not Approved.Please contect with our admin</h3>
            }
        </div>
      
    </>
  );
}
