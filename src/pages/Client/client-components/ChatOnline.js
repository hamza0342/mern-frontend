import React, { useState, useEffect } from 'react'
import '../../../scss/chatonline.scss'
import { create_conversation, getSub } from '../clientapi'
import { isAuthenticated } from '../../../authentication/index'

import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';

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

function ChatOnline(props) {
    const classes = useStyles();
    const [sub, setsub] = useState([])

    const token = isAuthenticated().token
    const clientId = isAuthenticated().client._id;
    const clientName = isAuthenticated().client.name

    console.log(sub)


    useEffect(() => {

        getSub(clientId, token).then((data) => {
            if (data.error) {
                console.log(data.error);


            } else {

                setsub(data)


            }
        })
    }, [])

    const handleId = (clientId, subId, name, clientName) => {

        create_conversation(clientId, subId, name, clientName).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                props.callback()
            }
        })

    }
    return (
        <>
            <div>
                <h3>
                    Sub-Contractors
                </h3>
            </div>
            <div className="chatOnline" >
                {sub.map((subs) => (
                    <div className="chatOnlineFriend" onClick={() => handleId(clientId, subs._id, subs.name, clientName)}>
                        <div className="chatOnlineImgContainer">
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
                        </div>
                        <span className="chatOnlineName">{subs?.name}</span>
                    </div>
                ))}


            </div>
        </>
    )
}

export default ChatOnline