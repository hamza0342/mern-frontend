import React from 'react'
import '../../../scss/message.scss'
import { format } from "timeago.js";


function Message({ message, own }) {

    return (
        <>
     
        <div className={own ? "message own" : "message"}>
          
        <div className="messageTop">
          <img
            className="messageImg"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScq93oBN48o2zk-ouV8aILM1aSkv9N4EyVyw&usqp=CAU"
            alt=""
          />
          <p className="messageText">{message.text}</p>

        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
      </div>
      </>
    )
}

export default Message
// src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"