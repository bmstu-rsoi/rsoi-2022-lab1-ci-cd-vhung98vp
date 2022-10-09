const Sequelize = require('sequelize');

const database = new Sequelize(
    process.env.DB_SCHEMA || 'persons',
    process.env.DB_USER || 'program',
    process.env.DB_PASSWORD || 'test',
    {
        host: process.env.DB_HOST || 'host.docker.internal',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres'
    }
);

module.exports = database;