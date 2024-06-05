class Storage {
    create(user) {
        throw new Error("Method 'createUser()' must be implemented.");
    }

    getAll() {
        throw new Error("Method 'getAllUsers()' must be implemented.");
    }

    getById(id) {
        throw new Error("Method 'getUserById()' must be implemented.");
    }

    update(id, user) {
        throw new Error("Method 'updateUser()' must be implemented.");
    }

    delete(id) {
        throw new Error("Method 'deleteUser()' must be implemented.");
    }

    clear() {
        throw new Error("Method 'clear()' must be implemented.");
    }
}

module.exports = Storage;
