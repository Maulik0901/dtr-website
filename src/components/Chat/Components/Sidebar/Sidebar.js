import React, { Component }  from 'react';
import "./Sidebar.css";
import SideBarChats from "../SidebarChats/SideBarChats";
import { useState } from "react";
const Sidebar = () => {
  const [allPartners, setAllPartners] = useState([
    {
      id: "8123083",
      name: "Partner Name",
      lastSeen: "1 hour ago",
    },
    {
      id: "8123073",
      name: "Partner Name",
      lastSeen: "2 hour ago",
    },
  ]);
  return (
    <div className="sidebar">
      <div className="sidebar-header">{/* <Avatar/> */} Matromonial Chat Room</div>
      <div className="sidebar-chats">
        {allPartners.map((each) => {
          return <SideBarChats key={each.id} partner={each}/>;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
