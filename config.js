module.exports = {
    port:3000,
    serverName:'my awesome mvc app',
    viewsPath : require('path').join(__dirname,'app/views'),
    staticPath: 'public',
    mongoConnStr : 'mongodb://localhost/monodev'
}