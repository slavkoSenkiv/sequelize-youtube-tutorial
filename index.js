const Sequelize = require('sequelize'); 
const {DataTypes} = Sequelize;
const sequelize = new Sequelize(
    'sequelize-video', 
    'postgres', 
    'pass', 
    {
        dialect: 'postgres',
        freezeTableName: true    });

//authenticate
sequelize.authenticate().then(() => {
    console.log('connection successful');
}).catch((err) =>{
    console.log('Error conecting to the database');
});


const User = sequelize.define('users_test',{
    user_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [4, 6]}
    },
    password:{
        type: DataTypes.STRING
    },
    age:{
        type: DataTypes.INTEGER,
        defaultValue: 21
    },
    from_yupiter:{
       type: DataTypes.BOOLEAN,
        defaultValue: true
    } 
},
{
    timestamps: false
});

User.sync({alter: true}).then(() => {
    //return User.findAll({attributes: ['username', 'age']});
    //return User.findAll({attributes: [['username', 'fName'], ['age', 'yo']]});
    //return User.findAll({attributes: [[sequelize.fn('AVG', sequelize.col('age')), 'avg age']]});
    //return User.findAll({attributes: {exclude: 'password'}});
    //return User.findAll({where: {age: 42}});
    //return User.findAll({attributes: ['username', 'age', ], where: {age: 42}});
    return User.findAll({attributes: ['username', 'age', ], where: {age: 42, username: 'Dude'}});
}).then((data)=>{
    data.forEach((dataPiece)=>{
        console.log(dataPiece.toJSON());
    });
}).catch((err) => {
    console.log('error syncing the table and model');
    console.log(err);
});

