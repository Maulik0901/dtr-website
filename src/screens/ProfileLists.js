import React from 'react'
import ProfileList from '../components/profileList/ProfileList'
import { useLocation } from 'react-router-dom';
function ProfileLists({userId}) {
  const { state } = useLocation();

  

  const mygender= localStorage.getItem('dtrusergender')
  // console.log(mygender,"sky")
 
  const searchedUser=state.data.filter(e=>e.gender&& e.gender!==mygender)

  return (
      <div style={{minHeight:'100vh',width:'100%'}}>
      {searchedUser?.length>0?searchedUser.map(user=><ProfileList user={user} userId={userId} />):<h3 style={{margin:'1rem',width:'100%',textAlign:'center'}}>No User Found</h3>}
      
    </div>
  )
}

export default ProfileLists