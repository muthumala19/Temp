// module.exports = (sequelize, Sequelize) => {
//     const User = sequelize.define("user", {
//         user_ID: {
//             type: Sequelize.STRING
//         },
//         role: {
//             type: Sequelize.STRING
//         },
//         username: {
//             type: Sequelize.STRING
//         },
//         password: {
//             type: Sequelize.STRING
//         }
//     });
//
//     User.sync({ force: false }).then(() => {
//         console.log("Drop and re-sync db.");
//     });
//
//     return User;
// };


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
    }, {
        tableName: 'user'
    });

    User.sync({force: false}).then(() => {
        console.log("User table created or already exists");
    });

    return User;
};