const Sequelize = require('sequelize'); 
const {DataTypes} = Sequelize;
const sequelize = new Sequelize(
    'sequelize-video', 
    'postgres', 
    'pass', 
    {
        dialect: 'postgres',
        freezeTableName: true,
        timestamps: false
    });

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


const User = sequelize.define('users_test',{
    user_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false
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
});


//sequelize.sync({alter: true});


User.sync({alter: true}).then((data) => {
    
    const user = User.build({
        username: 'slav', 
        password: 'pass', 
        age: 27, 
        from_yupiter: true
    });

    console.log('table and model synced successfully');
    console.log(user.username);
    console.log(user.password);

    return user.save();

}).then((data)=>{
    console.log('user added to database');

}).catch((err) => {
    console.log('error syncing the table and model');
    console.log(err);
});

