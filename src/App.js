import React from 'react'
import Nav from './Nav'
import Home from './Home'
import Users from './Users'
import UserForm from './UserForm'
import redux from 'redux'
import {Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUsers, getOneUser} from './store'


// const mapStateToProps = (state) => {
  

//     return {
//         topRankedUsers
//     }
// }

const mapDispatchToProps = (dispatch) =>{
    return {
        fetchInitialUsers: () => dispatch(getUsers())
    }
}



class App extends React.Component{

    // passUsersToNav = (users) =>{
    //     let names = ''
    //     users.forEach(user => user.name)
    // }
    componentDidMount(){
        this.props.fetchInitialUsers()
    }

    render(){
        return(
            <div>
                <h1>RANKED USERS!!!!!THESE ARE THE BESSSSSTTTTT</h1>
                <Nav />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/users' component={Users} />
                        <Route exact path='/users/topRanked' render={(props) => <Users topRankedUsers={true} />} />
                        <Route exact path='/users/create' render={(props) => <UserForm />} />
                        <Route exact path='/users/:userId' render={(props)=> <UserForm location={props.location} match={props.match}/>} />
                    </Switch>
            </div>
            
        )
    }
}


export default connect(null, mapDispatchToProps)(App)