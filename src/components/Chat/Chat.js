import React, { Component }  from 'react';
import "./Chat.css";

import Sidebar from "./Components/Sidebar/Sidebar"
import Chatbar from "./Components/ChatBar/ChatBar"
const Chat = () => {
  return (
    <div className="app">
      <div className="app-body">
        <Sidebar/>
        <Chatbar/>
      </div>
    </div>
  );
};

export default Chat;
