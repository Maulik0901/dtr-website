import React, { Component }  from 'react';
import { useEffect, useState } from "react";
import "./ChatBar.css";
const ChatBar = () => {
  const [refreshView, setRefreshView] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "45646",
      sentBy: "me",
      name: "Mamun",
      message: "Hi this is me",
      timestamp: new Date(),
    },
    {
      id: "65496132",
      sentBy: "partner",
      name: "Sunny",
      message: "Hi this is from a friend",
      timestamp: new Date(),
    },
  ]);
  useEffect(() => {
    setMessages(messages);
  }, [refreshView, messages]);
  const [input, setInput] = useState("");
  const sendMessages = (e) => {
    e.preventDefault();
    messages.push({
      id: Math.random(),
      sentby: "me",
      name: "Mamun",
      message: input,
      timestamp: new Date(),
    });
    setRefreshView(!refreshView);
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chatHeader">
        {/* <Avatar/> */} Avatar
        <div className="chatHeaderInfo">
          <h3>Partner Name</h3>
          <p>Last seen ...</p>
        </div>
      </div>
      <div className="chatBody">
        {messages.map((each) => {
          return (
            <p
              key={each.id}
              className={`${
                each.sentBy === "partner" ? "chatMsg " : "chatMsg sentMsg"
              }`}
            >
              <span className="chatName">{each.name}</span>
              {each.message}
              <span className="chatTimeStamp">{each.timestamp.toLocaleString()}</span>
            </p>
          );
        })}
      </div>
      <div className="chatFooter">
        <form>
          <input
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message here ..."
            type="text"
            value={input}
          />
          <button onClick={sendMessages} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
export default ChatBar;
