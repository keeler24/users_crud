import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'


const initialState = {
    users:[]
}

//Action types
const POST_NEW_USER = 'POST_NEW_USER'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'

const GET_USERS = 'GET_USERS_FROM_SERVER'
const GOT_USERS_FROM_SERVER = 'GOT_USERS_FROM_SERVER'


//anti magic stringzzzzz



//Action creators  shrinks state
// export const postNewUser = (user) => {
//     return (dispatch) => {
//         axios.post('/api/users', user)
//             .then(() => dispatch(getUsers()))
//     }
// }

export const updateUser = (user) =>{
    console.log('updating')
    console.log(user)
    return (dispatch) =>{
        axios.put('/api/users', user)
            .then(() => {
                dispatch(getUsers())
            })
    }
}

// export const getOneUser = (id) =>{
//     return (dispatch) =>{
//         axios.get(`/api/users/${id}`)
//     }
// }

export const deleteUser = (id) => {
    return (dispatch) => {
        axios.delete(`/api/users/${id}`)
            .then(() => dispatch(getUsers()))
    }
}

export const gotUsersFromServer = (users) => ({
    type:GOT_USERS_FROM_SERVER,
    users
})

export const postUser = (user) =>{
    return (dispatch) => {
        axios.post('/api/users', user)
            .then(resp => {
                dispatch(getUsers())
            })
    }
}

export const getUsers = () => {
    return (dispatch) =>{
        axios.get('/api/users')
            .then(resp => {
                dispatch(gotUsersFromServer(resp.data))
            })
    }
}


//reducer
const reducer = (state = initialState, action) => {
    switch(action.type){
        case GOT_USERS_FROM_SERVER:
            return {...state, users:action.users}
        // case DELETE_USER:
        //     return 
        // case GOT_NEW_USER_FROM_SERVER:
        //     return {...state, users:[...state.users, action.users]}
        default:
            return state
    }
}

//store
const store = createStore(reducer, applyMiddleware(thunkMiddleware))

export default store