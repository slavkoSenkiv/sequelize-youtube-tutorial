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

    //return User.findAll({attributes: ['username', 'age']});
    //return User.findAll({attributes: [['username', 'fName'], ['age', 'yo']]});
    //return User.findAll({attributes: [[sequelize.fn('AVG', sequelize.col('age')), 'avg age']]});
    //return User.findAll({attributes: [[sequelize.fn('SUM', sequelize.col('age')), 'total age']]});
    //return User.findAll({attributes: {exclude: 'password'}});
    //return User.findAll({where: {age: 42}});
    //return User.findAll({attributes: ['username', 'age', ], where: {age: 42}});
    //return User.findAll({attributes: ['username', 'age', ], where: {age: 42, username: 'Dude'}});
    //return User.findAll({limit: 2});
    //return User.findAll();
    //return User.destroy({where: {user_id: {[Op.gt]:20}}});
    //return User.destroy({where: {}, truncate: true});
    //return User.findAll({order: [['age', 'ASC']]});
    //return User.findAll({attributes: ['age',[sequelize.fn('COUNT', sequelize.col('username')), 'names per age']],group: 'age'});
    //return User.findAll({where: {[Op.or]:{username: 'Float', age: 10}}});
    //return User.findAll({where: {age: {[Op.gt]: 11}}}-
    /* return User.findAll({

        attributes:[
        ['username', 'name'],
        ['age', 'yo']
        ],

        where: {
            age: {
                [Op.or]:{
                    [Op.lt]:11,
                    [Op.eq]:11
                }
            }
        }
    }); */

    return User.findAll({
        attributes: [
            ['username', 'name'],
            ['age', 'yo']
        ],
        where: 
            sequelize.where(sequelize.fn('char_length', sequelize.col('username')), 4)
});

}).then((data)=>{
    data.forEach((dataPiece)=>{
        console.log(dataPiece.toJSON());
    });
}).catch((err) => {
    console.log('error syncing the table and model');
    console.log(err);
});

