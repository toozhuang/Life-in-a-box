const express = require('express');
const mysql = require('mysql');

const dbDetail = require('./db.config');

const app = express();

const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('wang-box', 'wang', 'x=Tkqv3.*', {
    host: 'localhost',
    dialect: 'mysql',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

// Option 2: Passing a connection URI
//   const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


const Model = Sequelize.Model;
class User extends Model { }
User.init({
    // attributes
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
    sequelize,
    modelName: 'user'
    // options
});

// Note: using `force: true` will drop the table if it already exists
User.sync({ force: true }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
});