const Sequelize = require('sequelize'); 
const sequelize = new Sequelize('sequelize-video', 'postgres', 'pass', {dialect: 'postgres'});

//authenticate
sequelize.authenticate().then(() => {
    console.log('connection successful');
}).catch((err) =>{
    console.log('Error conecting to the database');
});

//another way to authenticate
/* async function sequelizeAuth(){
    await sequelize.authenticate();
    console.log('Connection successfull');
}
sequelizeAuth(); */


const User = sequelize.define('user',{
    user_id:{
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.DataTypes.STRING
    },
    age:{
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 21
    }
},
{
    freezeTableName: true,
    timestamps: false
});

User.sync().then((data) => {
    console.log('table and model synced successfully');
}).catch((err) => {
    console.log('error syncing the table and model');
});