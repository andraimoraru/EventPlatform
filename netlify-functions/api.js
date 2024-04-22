import serverless from 'serverless-http'
const app = require('../backend/app');  

module.exports.handler = serverless(app);