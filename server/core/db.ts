import {Sequelize} from 'sequelize'

const sequelize = new Sequelize(process.env.DB_HOST,process.env.DB_USER,process.env.DB_PASSWORD ,{
    host: process.env.DB_HOST,
    dialect: 'postgres'
});

(async ()=> {
    try {
        await sequelize.authenticate()
        console.log('DB Connected');
    } catch (error) {
        console.log(error);
    }
})

export {sequelize}