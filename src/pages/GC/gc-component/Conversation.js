import React, { useState, useEffect } from 'react'
import '../../../scss/conversation.scss'
import axios from 'axios'
import { getclientbysub } from '../../Client/clientapi'
import { getconversation } from '../gcapi'
import { isAuthenticated } from '../../../authentication/index'
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { getgcconversation } from '../../Client/clientapi';

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const SmallAvatar = withStyles((theme) => ({
    root: {
        width: 22,
        height: 22,
        border: `2px solid ${theme.palette.background.paper}`,
    },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function Conversation({ conversation, currentUser}) {
    const convoID = conversation._id;
    const createdBy = isAuthenticated().subContractor.createdBy

    const userId = isAuthenticated().subContractor._id
    const [conversationss, setconversationss] = useState([])
    const [chats, setChats] = useState([])
    const classes = useStyles();
    // console.log(conversation , "sasas",currentUser )
    const [user, setUser] = useState(null);
    const friendId = conversation.members.find((m) => m !== currentUser);

        console.log(userId)
        console.log(conversation)

        if(userId == conversation.userA[0].id)
        {
            console.log("Equals")
        }
        else{
            console.log("Not Equal")
        }

        const getUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/getSubcontractors/${currentUser}/${friendId}`);
                setUser(res.data[0].name);
    
            } catch (err) {
                console.log(err);
            }
        };
    

    useEffect(() => {
        const token = isAuthenticated().token
        getclientbysub(createdBy, token).then((res) => {
            if (res.error) {
                console.log(res.error)
            }
            else {
                setChats(res[0].name)
                

            }
        })

        getUser()
    }, [conversation, currentUser])


    



    return (
        <div className="conversation">
            {/* <span className="conversationName"></span> */}
            <div className={classes.root}>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot"
                >
                    <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScq93oBN48o2zk-ouV8aILM1aSkv9N4EyVyw&usqp=CAU" />
                </StyledBadge>

            </div>


            {/* <div>
             {conversationss.map((convo)=>(
                <h3>{convo.text}</h3>
             ))}
         </div> */}
        
         {chats}
            {user}


              <div className="notification">


                <span></span>
                <span class="badge">

                
                {userId == conversation.userA[0].id ?(conversation.userA[1].notifications) :("")}
            {userId == conversation.userB[0].id ?(conversation.userB[1].notifications) :("")}
        
                </span>


            </div> 
         


        </div>
    )
}

export default Conversation