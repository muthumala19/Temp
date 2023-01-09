const db = require("../models");
const {noRawAttributes} = require("sequelize/lib/utils/deprecations");
const User = db.user;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a user
    const user = {
        user_ID: req.body.user_ID,
        role: req.body.role,
        username: req.body.username,
        password: req.body.password,

    };

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.authenticateUser = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.findOne = (req, res) => {
    const userID = req.user_ID;
    User.findOne({
        attributes: ['user_ID', 'role', 'username', 'password'],
        where: { user_ID: userID }
    })
        .then(data => {
            console.log(data);
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${userID}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + userID
            });
        });
};

// exports.findOne = (req, res) => {
//     console.log("findOne");
//     const userID = req.user_ID;
//
//
//     User.findOne({  where: { user_ID: userID } })
//         .then(user => {
//             // do something with the user object
//             console.log(user);
//             res.send(user);
//         })
//         .catch(error => {
//             // handle any errors that may have occurred during the query
//             console.error(error);
//             res.send(error);
//         });
// };







// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const userID = req.params.user_ID;

    User.update(req.body, {
        where: { user_ID: userID }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${userID}. Maybe user was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + userID
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const userID = req.params.user_ID;

    User.destroy({
        where: { userID: userID }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${userID}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + userID
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} User were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};
