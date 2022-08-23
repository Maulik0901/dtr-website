import React, { Component }  from 'react';
import './SideBarChats.css'
const SideBarChats = ({partner}) => {
    return (
        <div className="sidebar-chat">
            {/* <Avatar/> */} Avatar
            <div className="sidebar-chatInfo">
                <h2>{partner.name}</h2>
                <p>{partner.lastSeen}</p>
            </div>            
        </div>
    );
};

export default SideBarChats;