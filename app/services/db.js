const mongoose = require('mongoose')
const config = require('../../config')
const chalk = require('chalk')
module.exports = {
    connect: () => {      
        const connection = mongoose.connection
        connection.on('error', console.error.bind(console, 'mongodb connection error:'));
        connection.once('open', function () {
            console.log(chalk.blue('successfully connected to mongodb'))
        });    
        mongoose.connect(config.mongoConnStr)
        return connection
    }
}