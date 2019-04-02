import React from 'react'
import {NavLink, Link, Switch} from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = (state) =>{
    return{
        userCount:state.users.length
    }
}


class Nav extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <ul className="nav nav-tabs" style={{marginBottom: 10 + 'px'}}>
                    <NavLink activeClassName="active" to='/' className="nav-link">Home</NavLink>
                    <NavLink activeClassName="active" to='/users' className="nav-link">Users {this.props.userCount}</NavLink>
                    <NavLink activeClassName="active" to='/users/create' className="nav-link">Create A User</NavLink>
                    <NavLink activeClassName="active" to='/users/topRanked' className="nav-link">Top Ranked</NavLink>
                </ul>
            </div>
        )
    }
   }

export default connect(mapStateToProps)(Nav)