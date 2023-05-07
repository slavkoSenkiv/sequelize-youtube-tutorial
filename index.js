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
        allowNull: false,
        validate: { len: [4, 6]}
        //usecase to limit entry length or incorrect entry
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


//sequelize.sync({alter: true});


User.sync({alter: true}).then((data) => {
    
/*     const user = User.build({
        username: 'slav', 
        password: 'pass', 
        age: 27, 
        from_yupiter: true
    });

    console.log('table and model synced successfully');
    console.log(user.username);
    console.log(user.password);

    return user.save(); */

    return User.bulkCreate([
        {
            username: '14444' ,
            password: 'passcode',
            //age: 44,
            from_yupiter: false
        },
        {
            username: '24444' ,
            password: 'passcode',
            //age: 44,
            from_yupiter: true
        },
        {
            username: '34444' ,
            password: 'passcode',
            //age: 44,
            from_yupiter: true
        }
    ],
    {
        validate: true
    });

}).then((data)=>{
    /* data.username = 'pizza';
    data.age = 44;
    //return data.destroy();
    //return data.reload();
    //return data.save({fields: ['age']}); */
    //data.decrement({age: 2}); 
    //usecase - simplify update when user decreases any integer like ingredient amount or guest number
    //multiple decreaes at once are also possible with data.decrement({age: 2, height: 2});
    data.forEach((dataPiece)=>{
        console.log(dataPiece.toJSON());
    })
/* }).then((data)=>{
    console.log('user destroyed');
    console.log('user returned to normal');
    console.log('only age saved');   */

}).catch((err) => {
    console.log('error syncing the table and model');
    console.log(err);
});

