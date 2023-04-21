import Sequelize  from "sequelize";

const connection = new Sequelize('perguntas_e_respostas', 'root', 'mypassword',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

export default connection;