let mongoose = require('mongoose');

//Replace with DB server address when on production
const server = 'localhost';
const database = 'dev';

class Database {
    constructor() {
        this._connect()
    }


_connect() {
    mongoose.connect(`mongodb://${server}/${database}`, {useNewUrlParser: true})
        .then(() => {
            console.log('Database Connection Succesful');
        })
        .catch(() => {
            console.error('Database connection error')
        })
    }
};

module.exports = new Database();