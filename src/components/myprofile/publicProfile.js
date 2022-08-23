import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { RiFileUserLine } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
export default function PublicProfile() {
    const { state } = useLocation();
    const [selectedFile, setSElectedFile] = useState(null);
    const [userData,setUserData]=useState(null)
    const history = useNavigate();

    const getProfilePic = (profilePicId) => {
     
        axios
          .get(process.env.REACT_APP_API_URL+`user/${profilePicId}`)
          .then((file) => setSElectedFile(file.data));
      };
      useEffect(() => {
       let id=state?.user?._id
        axios
          .get(process.env.REACT_APP_API_URL+`user/getuser/${id}`)
          .then((data) => {
            setUserData(data.data)
            getProfilePic(data?.data?.profilePicId);
      
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
  return (
      <div style={{padding:'2rem',width:'960px',margin:'auto',backgroundColor:'white'}}> <div className="manage-profile">
      
     
      <div className="user-details" style={{margin:'1rem'}}>
      <div style={{margin:'2rem'}}>
     
     {(selectedFile && selectedFile.title=="Download Error") || !selectedFile ? (
        <FaUserCircle size={200} color="grey" />
     ) : (
    
       <img
       src={selectedFile}
       style={{ width: "100%", maxWidth:'200px',borderRadius:'50%',height: "auto" }}
     />
     )}

   
 
 </div>
        <div class="row row-acc-1">
          <div className="data-1">
          <div class="single-data name">
            
            <div className="property " >Name:</div>
            <div className="value" style={{color:'black',textTransform:'capitalize'}} >{userData?.name}</div>
          </div>
           <br></br>
           <div class="single-data name">
            
            <div className="property " >Email:</div>
            <div className="value" style={{color:'black',textTransform:'capitalize'}} >{userData?.email}</div>
          </div>
          <br></br>
            <div class="single-data name">
            
              <div className="property " >Age / Height:</div>
              <div className="value" style={{color:'black',textTransform:'capitalize'}}>{userData?.Age}</div>
            </div>
            <br></br>
            <div class="single-data name">
              <div className="property">Marital Status:</div>
              <div className="value" style={{color:'black',textTransform:'capitalize'}}>{userData?.maritalState}</div>
            </div>
            <br></br>
            <div class="single-data name">
              <div className="property">Posted by:</div>
              <div className="value" style={{color:'black',textTransform:'capitalize'}}>{userData?.BasicsAndLifestyle[0]?.Profilecreatedby}</div>
            </div>
          </div>
          <div className="data-2">
            <div class="single-data name">
              <div className="property">Religion / Community:</div>
              <div className="value" style={{color:'black',textTransform:'capitalize'}}>{userData?.Religion}</div>
            </div>
            <br></br>
            <div class="single-data name">
              <div className="property">Location:</div>
              <div className="value" style={{color:'black',textTransform:'capitalize'}}>{userData?.location}</div>
            </div>
            <br></br>
            <div class="single-data name">
              <div className="property">Mother Tongue:</div>
              <div className="value" style={{color:'black',textTransform:'capitalize'}}>{userData?.MotherTongue}</div>
            </div>
          </div>
        </div>
      
      </div>
    
    </div>
    <div>

    </div>
    {state.recommendedUser&&state.recommendedUser.length>0&&  <div className="name" style={{width:'100%',color:'grey',textTransform:'uppercase',textAlign:'center'}}>  <h3>More Recommended Matches</h3></div>
  }
    <div className="recommended-match"> {state.recommendedUser&&state.recommendedUser.length>0&&state.recommendedUser.filter(e=>e._id!==userData?._id).map((user,index)=> index<4&& <div className="user-card">
        <RiFileUserLine size={"100%"} color="grey" />
           
            <div className="name">
            <button onClick={()=>{   
              history("/profile",{ state:{user:user,recommendedUser:state.recommendedUser} })
                }}>{user.name}</button>
            </div>
          </div>)}
    </div>
   
    </div>
   
  )
}
