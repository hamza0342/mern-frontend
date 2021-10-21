import React, { useState, useEffect, useRef } from 'react'
import '../../scss/chat.scss'
import { Link } from 'react-router-dom';
import { Layout, Menu, Dropdown, } from 'antd';
import Conversation from './gc-component/Conversation';
import Message from './gc-component/Message';
import GcChatOnline from './gc-component/ChatOnline';
import Avatar from '@material-ui/core/Avatar';
import { getgcconversation } from '../Client/clientapi';
import { isAuthenticated } from '../../authentication';
import axios from 'axios'
import { io } from "socket.io-client";

const { Header, Content, Footer } = Layout;

function GC_Chat() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setuser] = useState([])
  const [user1, setuser1] = useState([])
  const [user2, setuser2] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null);
  let [count, setCount] = useState(0);
  let [Msgcount, setMsgCount] = useState(0);
  const scrollRef = useRef();
  const socket = useRef();
  const client = isAuthenticated()

  const clientId = isAuthenticated().subContractor._id;
  const token = isAuthenticated().token;
  const clientName = isAuthenticated().subContractor.name

  let handleChildUpdate = (req, res) => {
    setCount(++count)
    console.log(count)
  }


  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);



  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", clientId);

  }, [client]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    getgcconversation(clientId, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {

        setConversations(data)

      }
    })
  }, [count]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);



  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);





  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: clientId,
      text: newMessage,
      conversationId: currentChat._id,
      notification: 1
    };

    const receiverId = currentChat.members.find(
      (member) => member !== clientId
    );

    socket.current.emit("sendMessage", {
      senderId: clientId,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:8080/api/messages/", message);
      setMsgCount(++Msgcount)
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const namehandler = (name) => {
    console.log(name)
    setuser(name)

  };





  const signout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
    }
    <Link to="/"></Link>
    // console.log("Signout Successfull")
    window.location.reload();
  }
  //Extracting first letter of name 
  var str = isAuthenticated().subContractor.name;
  var result = str.substring(0, 1);


  const menu = (
    <Menu style={{ width: 120 }}>
      <Menu.Item key="0">
        <Link to="#">
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={signout}>
        Signout
      </Menu.Item>
    </Menu>
  );


  let handleOnclick = (c, cId, clientId) => {
    let name = "Shehryar"
    axios.patch("http://localhost:8080/api/conversations/update/notification",
      {
        conversationId: cId,
        userId: clientId
      }).then((ok) => {
        console.log(ok)
        setCurrentChat(c)

        setuser1(c.user1)
        setuser2(c.user2)
        setCount(++count)

      }).catch((err) => {
        console.log(err)
      })

  }

  return (
    <>
      <Layout className="layout" >
        <Header className="header-style" style={{ paddingLeft: 30, paddingRight: 30 }}>
          <Menu theme="dark" mode="horizontal" className="header-style">
            {
              isAuthenticated() && (
                <Menu.Item key="1">
                  <a>
                    <Link to={`/gc/dashboard`}>
                      {isAuthenticated().subContractor.name}
                    </Link>
                  </a>
                  's Account
                </Menu.Item>
              )
            }
            <Dropdown overlay={menu} placement={"bottomCenter"} >
              <Avatar
                className="avatar-props"
                onClick={e => e.preventDefault()}
                size={30}
                style={{ marginLeft: 10 }}
              >
                {result}
              </Avatar>
            </Dropdown>
          </Menu>
        </Header>
        <Content>
          <div className="chat">

            <div className="chatMenu">
              <div className="chatMenuWrapper">
                <h3 style={{ textDecoration: "underline 3px " }}>Conversations</h3>
                {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
                {conversations.map((c) => (
                  <div onClick={() => { handleOnclick(c, c._id, clientId) }}>
                    <Conversation conversation={c} currentUser={clientId} />


                  </div>
                ))}
              </div>
            </div>

            <div className="chatBox">
              {
                currentChat ? (

                  <div style={{
                    borderTopStyle: "2px solid",
                    color: "white",
                    padding: 2.7,
                    // borderTopLeftRadius: 10,
                    // borderTopRightRadius: 10,
                    fontSize: 22,
                    fontWeight: 600,
                    backgroundColor: "#ff8b3d",





                  }}> {clientName == user1 ? (<>
                    <div style={{ display: "flex" }}>
                      <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScq93oBN48o2zk-ouV8aILM1aSkv9N4EyVyw&usqp=CAU" style={{ marginLeft: 10, }} />

                      <span style={{ marginLeft: 10, fontSize: 12, marginTop: 10 }}>{user2}</span>
                    </div>


                  </>) : (<>
                    <span >{user2}</span>
                  </>)}</div>

                ) : ("")
              }
              <div className="chatBoxWrapper">
                {currentChat ? (
                  <>
                    <div className="chatBoxTop">
                      {messages.map((m) => (
                        <div ref={scrollRef}>
                          <Message message={m} own={m.sender === clientId} />
                          {/* <Message />  */}
                        </div>
                      ))}
                    </div>
                    <div className="chatBoxBottom">
                      <textarea
                        className="chatMessageInput"
                        placeholder="write something..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                      ></textarea>
                      <button className="chatSubmitButton" onClick={handleSubmit}>
                        Send
                      </button>
                    </div>
                  </>
                ) : (
                  <span className="noConversationText">
                    Open a conversation to start a chat.
                  </span>
                )}
              </div>
            </div>
            <div className="chatOnline">
              <div className="chatOnlineWrapper">
                <GcChatOnline callback={handleChildUpdate} />
              </div>
            </div>
          </div>
        </Content>
        <Footer></Footer>

      </Layout>

    </>

  )
}

export default GC_Chat