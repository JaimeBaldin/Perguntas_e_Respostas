import Sequelize  from "sequelize";
import connection from "./database.js";

const pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

pergunta.sync({force: false}).then(() => {
    console.log('Tabela criada com sucesso!');
}); 

export default pergunta;