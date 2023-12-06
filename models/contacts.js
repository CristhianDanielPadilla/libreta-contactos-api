module.exports = (sequelize, type) => {
    return sequelize,define('contact', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            authIncrement: true
        },
        user_id: type.INTEGER,
        name: type.STRING,
        lastname: type.STRING,
        email: type.STRING,
        phone: type.STRING,
        cellphone: type.STRING,
        adress: type.STRING,
        favorite: {
            type: type.BOOLEAN,
            defaultValue: false,
        },
    })    
}