const Sequelize = require('sequelize');

const database = new Sequelize(process.env.DATABASE_URL || "postgres://program:test@localhost:5432/persons", {
    dialectOptions:{
        ssl: {
            require: true,
            rejectUnauthorized: false 
        }
    }
});

module.exports = database;