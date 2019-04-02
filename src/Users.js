import React from 'react'
import {getUsers, deleteUser} from './store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const mapStateToProps = (state) =>{
    return {
        users:state.users
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        deleteUser: (id) => dispatch(deleteUser(id))
    }
}


class Users extends React.Component{
    render(){
        let {users} = this.props
        
        if(this.props.topRankedUsers){
            const sortedByRank = users.slice().sort((a,b) => a.rank - b.rank)
            users = sortedByRank.filter((ele, i, sortedUsers) => ele.rank === sortedUsers[0].rank)
        }

        return(
            <div>
                <ul className = "list-group">
                    {users.map(user => (
                        <li key={user.id} className="list-group-item">
                            {user.name}<br />
                            {user.bio}<br />
                            {user.rank}<br />
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                            <button onClick={() => this.props.deleteUser(user.id)}>Delete</button><br />
                            {console.log(user.id)}
                            <Link to={{
                                pathname:`/users/${user.id}`,
                                state:{
                                    user:user
                                }
                                }}>Edit</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)