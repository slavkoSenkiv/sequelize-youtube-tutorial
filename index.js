const Sequelize = require('sequelize'); 
const {DataTypes, Op} = Sequelize;


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

    /* return User.bulkCreate([
        {username: 'Den', age: 10},
        {username: 'Goat', age: 11},
        {username: 'Float', age: 12}
    ]); */

    //return User.update({password: 'pass2word'}, {where: {user_id: {[Op.lt]: 50}}});
    //return User.sum('age');
    // usecase for summing total ingredients weight or recipe cost

    return User.max('age');
}).then((data)=>{
    /* data.forEach((dataPiece)=>{
        console.log(dataPiece.toJSON());
    }); */
    console.log(data);
}).catch((err) => {
    console.log('error syncing the table and model');
    console.log(err);
});

