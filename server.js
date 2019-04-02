const express = require('express');
const app = express();
const {User, db} = require('./db')
const PORT = process.env.PORT || 1337

app.use(express.json())
app.use(express.static('dist'))


app.get('/', (req, res) =>{
    res.sendFile(__dirname+'/index.html')
})

// app.get ('/api/users/:id', (req, res) => {
//     User.findOne({where:{id:req.params.id}})
//         .then(resp => {
//             res.send(resp)
//         })
// })
app.get('/api/users', (req, res) =>{
    User.getAll()
        .then(resp =>{
            res.send(resp)
        })
})

app.post('/api/users', (req, res) =>{
    User.insert(req.body)
        .then(resp =>{
            res.json(resp)
        })
})

app.put('/api/users', (req, res)=>{
    User.findOne({where:{id:req.body.id}})
        .then( user =>{
            console.log(user)
            user.update({name:req.body.name, bio:req.body.bio, rank:req.body.rank}, {fields:['name','bio','rank']})
        })
        .then(resp =>{
            res.json(resp)
        })
})

app.delete('/api/users/:id', (req, res) => {
    User.delete(req.params.id)
        .then(()=> res.status(204).end())
})

const a = {name:'a', bio:'he was an a', rank:1}
const b = {name:'b', bio:'he was an b', rank:2}
const c = {name:'c', bio:'he was an c', rank:3}

db.sync({force:true})
    .then( () =>{
        User.bulkCreate([a,b,c])
    })
    .then(() =>{
        console.log(`App is listening on port ${PORT}`)
        app.listen(PORT)
    })
    .catch(error => console.log(error))