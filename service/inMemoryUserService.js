const User = require('../model/user');
let users = [];
let idCounter = 1;

exports.getAll = () => {
    return users;
};

exports.getById = (id) => {
    return users.find(user => user.id === parseInt(id));
};

exports.create = (userData) => {
    const newUser = new User(idCounter++, userData.name, userData.email);
    users.push(newUser);
    return newUser;
};

exports.update = (id, userData) => {
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex !== -1) {
        users[userIndex].name = userData.name;
        users[userIndex].email = userData.email;
        return users[userIndex];
    } else return null;
};

exports.delete = (id) => {
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return true;
    } else return false;
}