module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONGODB_DB || 'mongodb://localhost:27017/shops',
    SECRET_TOKEN: process.env.SECRET_TOKEN || 'mysecrettoken',
}