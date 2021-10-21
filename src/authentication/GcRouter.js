import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isAuthenticated} from './index'

const GCRouter =({ component: Component, ...rest})=>(
    <Route 
        {...rest} 
        render={props => 
            isAuthenticated()?(
                <Component {...props}/>
            ):(
                <Redirect to={{
                    pathname:'/gc/signin',
                    state:{
                        from: props.location
                    }
                }}/>
            )}

    />
)


export default GCRouter;