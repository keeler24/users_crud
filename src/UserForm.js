import React from 'react'
import {connect} from 'react-redux'
import {postUser, updateUser} from './store'
import {Redirect} from 'react-router'


const mapDispatchToProps = (dispatch) =>{
    return {
        postUser: (user) => dispatch(postUser(user)),
        updateUser: (user) => dispatch(updateUser(user))
    }
}

class UserForm extends React.Component{
    constructor(){
        super()
        this.state = {
            id:'',
            name:'',
            bio:'',
            rank:0,
            redirect:false
        }
    }

    componentDidMount(){
        
    }
    handleInputs = (event) => {
        console.log(event.target.value)
        if(event.target.name === 'name') this.state.name = event.target.value
        if(event.target.name === 'bio') this.state.bio = event.target.value
        if(event.target.name === 'rank') this.state.rank = event.target.value
    }

    handleSubmit = () =>{
        console.log(this.state)
        const newUser ={}
        if (this.props.location) {
            newUser = {...this.props.location.state.user, ...this.state}
            console.log(newUser)
            this.props.updateUser(newUser)
        }else{
            this.props.postUser(this.state)
        }
        this.setState({redirect:true})
    }
    

    render(){
        if(this.state.redirect) return <Redirect to='/users' />
        
        let nameValue = "name"
        let bioValue = "bio"
        let rankValue = "rank"
        

        //location only passed on edit
        if(this.props.location){
            const {user} = this.props.location.state
            console.log(user)
            this.setState(user)
            nameValue = user.name
            bioValue = user.bio
            rankValue = user.rank
        }

      
        return(
            <div>
            <form>
                <input className="form-control" name="name" type="text" onChange={this.handleInputs} defaultValue={nameValue} />
                <input className="form-control" name="bio" type="text" onChange={this.handleInputs} defaultValue={bioValue}/>
                <input className="form-control" name="rank" type="text" onChange={this.handleInputs} defaultValue={rankValue}/>
                <button className="btn btn-primary" onClick={this.handleSubmit}>{this.props.location? 'edit' : 'create'}</button>
                <button className="btn btn-info" onClick={()=>{this.setState({redirect:true})}}>Cancel</button>
            </form>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(UserForm)