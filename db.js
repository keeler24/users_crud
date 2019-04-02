const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL);

const User = db.define('user', {
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    bio:{
        type:Sequelize.STRING,
    },
    rank:{
        type:Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,
            min:1,
        }

    }
})

User.delete = (userId) =>{
    return User.destroy({where:{id:userId}})
}

User.insert = (user) =>{
    return User.create({
        name:user.name,
        bio:user.bio,
        rank:user.rank
    })
}

User.getAll = () =>{
    return User.findAll()
}



module.exports = {User, db}