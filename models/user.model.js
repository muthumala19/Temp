module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        user_ID: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return User;
};