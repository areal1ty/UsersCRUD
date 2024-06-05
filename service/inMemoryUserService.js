const Storage = require('../service/storage');
const User = require('../model/user');
let idCounter = 1;

class InMemoryUserService extends Storage {

    constructor() {
        super();
        this.users = [];
    }


    getAll = () => {
        return this.users;
    };

    clear = () => {
        this.users.length = 0;
    };

    getById = (id) => {
        return this.users.find(user => user.id === parseInt(id));
    };

    create = (userData) => {
        const newUser = new User(idCounter++, userData.name, userData.email);
        this.users.push(newUser);
        return newUser;
    };

    update = (id, userData) => {
        const userIndex = this.users.findIndex(user => user.id === parseInt(id));
        if (userIndex !== -1) {
            this.users[userIndex].name = userData.name;
            this.users[userIndex].email = userData.email;
            return this.users[userIndex];
        } else return null;
    };

    delete = (id) => {
        const userIndex = this.users.findIndex(user => user.id === parseInt(id));
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            return true;
        } else return false;
    }
}

module.exports = InMemoryUserService;