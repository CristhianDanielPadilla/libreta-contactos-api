module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.STRING,
            primaryKey: true,
            authIncrement: true
        },
        username: type.STRING,
        password: type.STRING,
    })
    
}