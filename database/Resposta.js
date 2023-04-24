import Sequelize  from "sequelize";
import connection from "./database.js";

const resposta = connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

resposta.sync({force: false});

export default resposta;